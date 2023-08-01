const Card = require('../models/card');
const ForbiddenError = require('../errors/Forbidden');
const NotFoundError = require('../errors/NotFoundError');
const { HTTP_STATUS_OK, STATUS_CREATED } = require('../utils/constants');

// Возвращает все карточки
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(HTTP_STATUS_OK).send(cards))
    .catch(next);
};

// Создает карточку
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(STATUS_CREATED).send({ data: card }))
    .catch(next);
};

// Удаление карточки по id
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует');
      }
      if (card.owner._id.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Вы не можете удалить эту карточку');
      }
      return card.deleteOne().then((ok) => {
        res.status(HTTP_STATUS_OK).send(ok);
      });
    })
    .catch(next);
};

// Поставка лайка на карточку
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует');
      }
      return res.status(HTTP_STATUS_OK).send(card);
    })
    .catch(next);
};

// Удаление лайка с карточки
const delitLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует');
      }
      return res.status(HTTP_STATUS_OK).send(card);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  delitLikeCard,
};
