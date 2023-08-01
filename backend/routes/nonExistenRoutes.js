const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

// несуществующие адреса
module.exports = router.use('/*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});
