const router = require('express').Router();
const { userController }  = require('../controllers');

router.get('/kakao-signin', userController.signIn);

module.exports = router;