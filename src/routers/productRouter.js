const express = require('express');
const { productController }  = require('../controllers');
const { validToken, validTokenNull } = require('../utils/auth')
const router = express.Router();

router.get('/map/:category', validToken, productController.getMap);
router.get('/detail/:productId', validTokenNull, productController.getProductDetail);
router.get('/searchName', productController.productNameSearch);
router.get('/search/:keyword', productController.productSearch);
router.get('/priceFilter', validTokenNull,productController.getPriceFilter);
router.get('/:category', validTokenNull, productController.getProducts);


module.exports = router;