const Movie = require('../models/movie');
const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
} = require('../errors/errors');
const {
  ABSENT,
  IMPOSSIBLE,
} = require('../constants/message');

// возвращает все сохранённые текущим пользователем фильмы
const getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => {
      res.status(200)
        .send({ data: movies });
    })
    .catch((err) => {
      next(err);
    });
};

// создаёт фильм
const createMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.create({
    ...req.body,
    owner,
  })
    .then((newMovie) => {
      res.status(201).send(newMovie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`Проверьте правильность заполнения полей: ${Object.values(err.errors)
          .map((error) => `${error.message.slice(5)}`)
          .join(' ')}`));
      } else {
        next(err);
      }
    });
};

// удаляет сохранённый фильм по id
const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(ABSENT);
      } else if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(IMPOSSIBLE);
      } else {
        Movie.findByIdAndRemove(req.params._id)
          .then((deletedMovie) => res.status(200).send(deletedMovie))
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(ABSENT));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
