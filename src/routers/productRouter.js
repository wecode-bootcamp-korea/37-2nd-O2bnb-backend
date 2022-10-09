const express = require('express');
const { productController }  = require('../controllers');
const router = express.Router();

router.get('/:category', productController.getProducts);

module.exports = router;