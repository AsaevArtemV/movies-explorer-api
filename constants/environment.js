const { PORT = 3000 } = process.env;
const { DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { NODE_ENV } = process.env;
const { JWT_SECRET } = process.env;
const KEY_PASSWORD = 'somepassword';

module.exports = {
  PORT,
  DB_URL,
  NODE_ENV,
  JWT_SECRET,
  KEY_PASSWORD,
};
