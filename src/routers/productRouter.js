const express = require('express');
const { productController }  = require('../controllers');
const { validToken } = require('../utils/auth')
const router = express.Router();

router.get('/filter', validToken, productController.getPriceFilter);

module.exports = router;