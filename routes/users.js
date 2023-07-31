const router = require('express').Router();
const {
  getUserInfo,
  updateUserInfo,
} = require('../controllers/users');
const { patchUserMe } = require('../utils/validationJoi');

router.get('/me', getUserInfo);
router.patch('/me', patchUserMe, updateUserInfo);

module.exports = router;
