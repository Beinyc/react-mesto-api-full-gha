const { config } = require('dotenv');

const { NODE_ENV } = process.env;
const URL_SERVER = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

if (NODE_ENV === 'production') {
  config();
}

const { SECRET_KEY = 'dev-secret' } = process.env;

module.exports = {
  SECRET_KEY,
  URL_SERVER,
  NODE_ENV,
};
