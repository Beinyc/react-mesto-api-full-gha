const Card = require('../models/card');

const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorHandler = require('../errors/ErrorHandler');
const ErrorForbidden = require('../errors/ErrorForbidden');

// Карточки
function getInitialCards(_, res, next) {
  Card
    .find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(next);
}

// Добавление карточки
function addNewCard(req, res, next) {
  const { name, link } = req.body;
  const { userId } = req.user;

  Card
    .create({ name, link, owner: userId })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorHandler('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
}

// Удаление карточек
function deleteCard(req, res, next) {
  const { id: cardId } = req.params;
  const { userId } = req.user;

  Card
    .findById({
      _id: cardId,
    })
    .then((card) => {
      if (!card) {
        throw new ErrorNotFound('Данные по указанному id не найдены');
      }

      const { owner: cardOwnerId } = card;

      if (cardOwnerId.valueOf() !== userId) {
        throw new ErrorForbidden('Нет прав доступа');
      }

      return Card.findByIdAndDelete(cardId);
    })
    .then((deletedCard) => {
      if (!deletedCard) {
        throw new ErrorNotFound('Карточка уже была удалена');
      }

      res.send({ data: deletedCard });
    })
    .catch(next);
}

// Лайки на карточки
function addLike(req, res, next) {
  const { cardId } = req.params;
  const { userId } = req.user;

  Card
    .findByIdAndUpdate(
      cardId,
      {
        $addToSet: {
          likes: userId,
        },
      },
      {
        new: true,
      },
    )
    .then((card) => {
      if (card) return res.send({ data: card });

      throw new ErrorNotFound('Карточка с указанным id не найдена');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ErrorHandler('Переданы некорректные данные при добавлении лайка карточке'));
      } else {
        next(err);
      }
    });
}

// Удаление лайков с карточек
function removeLike(req, res, next) {
  const { cardId } = req.params;
  const { userId } = req.user;

  Card
    .findByIdAndUpdate(
      cardId,
      {
        $pull: {
          likes: userId,
        },
      },
      {
        new: true,
      },
    )
    .then((card) => {
      if (card) return res.send({ data: card });

      throw new ErrorNotFound('Данные по указанному id не найдены');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ErrorHandler('Переданы некорректные данные при снятии лайка карточки'));
      } else {
        next(err);
      }
    });
}

module.exports = {
  getInitialCards,
  addNewCard,
  addLike,
  removeLike,
  deleteCard,
};
