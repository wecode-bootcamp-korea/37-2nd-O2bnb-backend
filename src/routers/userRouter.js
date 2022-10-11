const router = require('express').Router();
const { userController }  = require('../controllers');
const { validToken } = require('../utils/auth')

router.get('/info', validToken, userController.getUserInfo);

module.exports = router;