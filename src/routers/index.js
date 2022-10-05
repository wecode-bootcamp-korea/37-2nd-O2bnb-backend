const express = require('express')
const router = express.Router();
const  { validToken } = require('../utils/auth.js');

const productRouter = require('./productRouter');

router.use('/product', validToken, productRouter);

module.exports = router;