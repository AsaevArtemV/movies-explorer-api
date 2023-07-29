const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;
const KEY_PASSWORD = 'somepassword';

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const JWT = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(JWT, NODE_ENV === 'production' ? JWT_SECRET : KEY_PASSWORD);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};

module.exports = auth;