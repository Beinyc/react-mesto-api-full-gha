const { config } = require('dotenv');

const { NODE_ENV } = process.env;

if (NODE_ENV === 'production') {
  config();
}

const { JWT_SECRET = 'dev-secret' } = process.env;

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const SERVER_ERROR_MESSAGE = { message: 'На сервере произошла ошибка' };
const PAGE_NOT_FOUND_MESSAGE = { message: 'Такого адреса не существует' };
const HTTP_STATUS_OK = 200;
const STATUS_CREATED = 201;
const DEFAULT_ERROR_STATUS = 500;
const BAD_REQUEST_STATUS = 400;
const NOT_FOUND_STATUS = 404;

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  URL_REGEX,
  SERVER_ERROR_MESSAGE,
  PAGE_NOT_FOUND_MESSAGE,
  HTTP_STATUS_OK,
  STATUS_CREATED,
  DEFAULT_ERROR_STATUS,
  BAD_REQUEST_STATUS,
  NOT_FOUND_STATUS,
};
