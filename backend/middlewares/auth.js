const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../utils/constants');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';

  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new ErrorUnauthorized('Неправильные почта или пароль'));
  }

  const token = authorization.replace(bearer, '');

  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(new ErrorUnauthorized('Неправильные почта или пароль'));
  }

  req.user = payload;

  return next();
};
