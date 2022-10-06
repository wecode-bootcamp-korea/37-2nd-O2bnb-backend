const express = require('express')
const router = express.Router();
const productRouter = require('./productRouter'); 
const userRouter = require('./userRouter');
const reviewRouter = require('./reviewRouter');

router.use('/products', productRouter);
router.use('/user', userRouter);
router.use('/reviews', reviewRouter);

module.exports = router;