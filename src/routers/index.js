const express = require('express')
const router = express.Router();

const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const likeRouter = require('./likeRouter');

router.use('/product', productRouter);
router.use('/user', userRouter);
router.use('/likes', likeRouter);

module.exports = router;