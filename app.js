require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { limiter } = require('./constants/limiter');
const routes = require('./routes');
const handleError = require('./middlewares/handeError');
const { NotFoundError } = require('./errors/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, DB_URL } = require('./constants/environment');

const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(helmet());

app.use(requestLogger); // подключаем логгер запросов

app.use(limiter);

app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(routes);

app.use('*', () => {
  throw new NotFoundError('Данная страница не найдена');
});

app.use(errorLogger);// подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(handleError);
app.listen(PORT);
