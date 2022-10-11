const express = require('express');
const { productController }  = require('../controllers');
const { validToken } = require('../utils/auth')
const router = express.Router();

router.get('/map/:keyword', validToken, productController.getMap);
router.get('/detail/:productId', validToken, productController.getProductDetail);
router.get('/searchName', productController.productNameSearch);
router.get('/search/:keyword', productController.productSearch);
router.get('/:category', validToken,productController.getProducts);

module.exports = router;