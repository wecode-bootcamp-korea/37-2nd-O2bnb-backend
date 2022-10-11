const express = require('express')
const router = express.Router();
const productRouter = require('./productRouter'); 

router.use('/product', productRouter);

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');

router.use('/user', userRouter);
router.use('/product', productRouter);

module.exports = router;