const router = require('express').Router();
const { userController }  = require('../controllers');
const { validToken } = require('../utils/auth')

router.get('/info', validToken, userController.getUserInfo);
router.get('/signIn', userController.signIn);
router.get('/kakao-signin', userController.signIn);

module.exports = router;