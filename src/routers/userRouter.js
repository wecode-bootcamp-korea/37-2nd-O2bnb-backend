const router = require('express').Router();
const { userController }  = require('../controllers');
const { validToken } = require('../utils/auth')

router.get('/info', validToken, userController.getUserInfo);
router.post('/signIn', userController.signIn);

module.exports = router;