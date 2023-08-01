const { PORT = 3000 } = process.env;
const { DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { NODE_ENV = 'development' } = process.env;
const { JWT_SECRET = 'secret' } = process.env;
const KEY_PASSWORD = 'somepassword';
const SALT_ROUNDS = 10;

module.exports = {
  PORT,
  DB_URL,
  NODE_ENV,
  JWT_SECRET,
  KEY_PASSWORD,
  SALT_ROUNDS,
};
