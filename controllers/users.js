const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} = require('../errors/errors');
const {
  NOT_FOUND,
  INCORRECT,
  INVALID_USER,
  EXISTS,
  NOT_TRANSMITTED,
  NO_USER,
} = require('../constants/message');

const {
  NODE_ENV,
  JWT_SECRET,
  KEY_PASSWORD,
  SALT_ROUNDS,
} = require('../constants/environment');

// возвращает информацию о пользователе
const getUserInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(NOT_FOUND));
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(INCORRECT));
      } else {
        next(err);
      }
    });
};

// добавляет пользователя
const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((newUser) => {
      res.status(201).send({
        name: newUser.name,
        email: newUser.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`Проверьте правильность заполнения полей: ${Object.values(err.errors)
          .map((error) => `${error.message.slice(5)}`)
          .join(' ')}`));
      } else if (err.code === 11000) {
        next(new ConflictError(EXISTS));
      } else {
        next(err);
      }
    });
};

// обновляет информацию о пользователе
const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError(NOT_FOUND));
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`Проверьте правильность заполнения полей: ${Object.values(err.errors)
          .map((error) => `${error.message.slice(5)}`)
          .join(' ')}`));
      } else if (err.code === 11000) {
        next(new ConflictError(EXISTS));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError(NOT_TRANSMITTED);
  }
  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(NO_USER);
      }
      return bcrypt.compare(password, user.password)
        .then((correctPassword) => {
          if (!correctPassword) {
            throw new UnauthorizedError(INVALID_USER);
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : KEY_PASSWORD,
            { expiresIn: '7d' },
          );
          return res.send({ jwt: token });
        });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getUserInfo,
  createUser,
  updateUserInfo,
  login,
};
