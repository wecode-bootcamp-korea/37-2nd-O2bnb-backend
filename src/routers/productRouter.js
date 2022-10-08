const express = require('express');
const { productController }  = require('../controllers');
const router = express.Router();

router.get('/search/:keyword', productController.productSearch);

module.exports = router;