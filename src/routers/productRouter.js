const express = require('express');
const router = express.Router();
const { productController }  = require('../controllers');
const { validToken } = require('../utils/auth');


router.get('/:category', validToken,productController.getProducts);
router.get('/detail/:productId', validToken, productController.getProductDetail);
router.get('/filter', validToken, productController.getPriceFilter);

module.exports = router;