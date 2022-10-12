const express = require('express')
const router = express.Router();

const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const likeRouter = require('./likeRouter');
const reviewRouter = require('./reviewRouter');
const bookRouter = require('./bookRouter');

router.use('/product', productRouter);
router.use('/user', userRouter);
router.use('/likes', likeRouter);
router.use('/reviews', reviewRouter);
router.use('/book', bookRouter);


module.exports = router;