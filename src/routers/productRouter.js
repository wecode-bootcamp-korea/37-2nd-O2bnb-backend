const express = require('express');
const { productController }  = require('../controllers');
const { validToken } = require('../utils/auth')
const router = express.Router();

router.get('/map/:keyword', validToken, productController.getMap);

module.exports = router;