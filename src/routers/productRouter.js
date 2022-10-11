const express = require('express');
const { productController }  = require('../controllers');
const { validToken } = require('../utils/auth')
const router = express.Router();

router.get('/map/:keyword', validToken, productController.getMap);
router.get('/detail/:productId', validToken, productController.getProductDetail);
router.get('/:category', validToken,productController.getProducts);
router.get('/search/:keyword', productController.productSearch);

module.exports = router;