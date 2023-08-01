// Подключаем dotenv чтобы с файла .env подключение было на сервере
require('dotenv').config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');

app.use(cors({
  origin: 'https://beiny.students.nomoreparties.co',
  credentials: true,
}));

const { requestLogger, errorLogger } = require('./middlewares/logger');

const nonExistenRoutes = require('./routes/nonExistenRoutes');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const auth = require('./middlewares/auth');
const errorsHandler = require('./middlewares/errorsHandler');

const {
  PORT = 3000,

} = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

// удалить после проверки ревью временный crash-test
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(registerRouter);
app.use(loginRouter);
app.use(auth);
app.use(userRoutes);
app.use(cardRoutes);
app.use(logoutRouter);
app.use(nonExistenRoutes);

app.use(errorLogger);

app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {});
