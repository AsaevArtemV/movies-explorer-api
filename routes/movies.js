const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');
const {
  postMovies,
  deleteMoviesId,
} = require('../utils/validationJoi');

router.get('/', getMovies);
router.post('/', postMovies, createMovie);
router.delete('/:_id', deleteMoviesId, deleteMovieById);

module.exports = router;
