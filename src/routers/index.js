const express = require('express')
const router = express.Router();
const  { validToken } = require('../utils/auth.js');

const productRouter = require('./productRouter');
const userRouter = require('./userRouter');

router.use('/products', validToken, productRouter);
router.use('/user', userRouter);

module.exports = router;