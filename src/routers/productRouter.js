const express = require('express');
const { productController }  = require('../controllers');
const { validToken } = require('../utils/auth');
const router = express.Router();

router.get('/:category', validToken,productController.getProducts);
router.get('/detail/:productId', validToken, productController.getProductDetail);

module.exports = router;