const express = require('express')
const router = express.Router();
const  { validToken } = require('../utils/auth.js');

const productRouter = require('./productRouter');

router.use('/product', validToken, productRouter);

const userRouter = require('./userRouter');

router.use('/user', userRouter);

module.exports = router;