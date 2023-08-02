require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorConflict = require('../errors/ErrorConflict');
const { NODE_ENV, SECRET_KEY } = require('../utils/constants');
const User = require('../models/user');
const ErrorHandler = require('../errors/ErrorHandler');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

// Регистрация
function registrationUser(req, res, next) {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      const { _id } = user;

      return res.status(201).send({
        email,
        name,
        about,
        avatar,
        _id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(
          new ErrorConflict(
            'Пользователь с таким электронным адресом уже зарегистрирован',
          ),
        );
      } else if (err.name === 'ValidationError') {
        next(
          new ErrorHandler(
            'Переданы некорректные данные при регистрации пользователя',
          ),
        );
      } else {
        next(err);
      }
    });
}

// Авторизация
function loginUser(req, res, next) {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then(({ _id: userId }) => {
      if (userId) {
        const token = jwt.sign(
          { userId },
          NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret',
          { expiresIn: '7d' },
        );

        return res.send({ token });
      }

      throw new ErrorUnauthorized('Неправильные почта или пароль');
    })
    .catch(next);
}

// Юсеры
function getUsers(_, res, next) {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
}

// Юсер по айди
function getUserId(req, res, next) {
  const { id } = req.params;

  User.findById(id)

    .then((user) => {
      if (user) return res.send(user);

      throw new ErrorNotFound('Пользователь с таким id не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorHandler('Передан некорректный id'));
      } else {
        next(err);
      }
    });
}

// Пользоветель по поиску
function getCurrentUserInfo(req, res, next) {
  const { userId } = req.user;

  User.findById(userId)
    .then((user) => {
      if (user) return res.send(user);

      throw new ErrorNotFound('Пользователь с таким id не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorHandler('Передан некорректный id'));
      } else {
        next(err);
      }
    });
}

// Обновление данных пользователя
function editProfileUserInfo(req, res, next) {
  const { name, about } = req.body;
  const { userId } = req.user;

  User.findByIdAndUpdate(
    userId,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) return res.send(user);

      throw new ErrorNotFound('Пользователь с таким id не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(
          new ErrorHandler(
            'Переданы некорректные данные при обновлении профиля',
          ),
        );
      } else {
        next(err);
      }
    });
}

// Обновление аватара пользователя
function updateProfileUserAvatar(req, res, next) {
  const { avatar } = req.body;
  const { userId } = req.user;

  User.findByIdAndUpdate(
    userId,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) return res.send(user);

      throw new ErrorNotFound('Пользователь с таким id не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(
          new ErrorHandler(
            'Переданы некорректные данные при обновлении профиля пользователя',
          ),
        );
      } else {
        next(err);
      }
    });
}

module.exports = {
  registrationUser,
  loginUser,
  getUsers,
  getUserId,
  getCurrentUserInfo,
  editProfileUserInfo,
  updateProfileUserAvatar,
};
