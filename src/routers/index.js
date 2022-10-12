const express = require('express')
const router = express.Router();
const likeRouter = require('./likeRouter');

router.use('/likes', likeRouter);

module.exports = router;
