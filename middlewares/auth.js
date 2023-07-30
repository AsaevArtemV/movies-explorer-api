const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/errors');
const { NODE_ENV, JWT_SECRET, KEY_PASSWORD } = require('../constants/environment');
const { AUTHORIZATION_REQUIRED } = require('../constants/message');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(AUTHORIZATION_REQUIRED);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : KEY_PASSWORD);
  } catch (err) {
    next(new UnauthorizedError(AUTHORIZATION_REQUIRED));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};

module.exports = auth;
