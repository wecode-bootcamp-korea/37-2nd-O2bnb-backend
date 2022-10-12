const express = require('express')
const router = express.Router();
const  { validToken } = require('../utils/auth.js');

const productRouter = require('./productRouter');

router.use('/product', validToken, productRouter);

const userRouter = require('./userRouter');

router.use('/user', userRouter);

const userRouter = require('./userRouter');
const likeRouter = require('./likeRouter');
const reviewRouter = require('./reviewRouter');
const bookRouter = require('./bookRouter');

router.use('/user', userRouter);
router.use('/likes', likeRouter);
router.use('/reviews', reviewRouter);
router.use('/book', bookRouter);


module.exports = router;