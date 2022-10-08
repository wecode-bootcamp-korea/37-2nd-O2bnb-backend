const express = require('express');
const router = express.Router();
const { productController }  = require('../controllers');
const { validToken } = require('../utils/auth');


router.get('/:category', validToken,productController.getProducts);
router.get('/detail/:productId', validToken, productController.getProductDetail);
router.get('/search/:keyword', productController.productSearch);
router.get('/searchKeyword', productController.productNameSearch);
router.get('/searchName', productController.productNameSearch);

module.exports = router;