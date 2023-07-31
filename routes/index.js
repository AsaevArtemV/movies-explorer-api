const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { signup, signin } = require('../utils/validationJoi');
const auth = require('../middlewares/auth');
const movieRoutes = require('./movies');
const userRoutes = require('./users');

router.post('/signup', signup, createUser);
router.post('/signin', signin, login);
router.use('/movies', auth, movieRoutes);
router.use('/users', auth, userRoutes);

module.exports = router;
