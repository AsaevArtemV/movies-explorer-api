const { SERVER_ERROR } = require('../constants/message');

const handleError = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res
      .status(500)
      .send({ message: err.message || SERVER_ERROR });
  }
  next();
};

module.exports = handleError;
