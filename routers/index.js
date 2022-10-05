const express = require('express')

const likeRouter = require('./likeRouter');

router.use('/likes', likeRouter);

const router = express.Router();

module.exports = router;