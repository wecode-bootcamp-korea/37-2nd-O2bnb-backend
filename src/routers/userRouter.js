const router = require('express').Router();
const { userController }  = require('../controllers');

router.get('/signIn', userController.signIn);

module.exports = router;