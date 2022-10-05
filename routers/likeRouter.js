const express = require("express");
const { likeController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

const likeRouter = express.Router();

likeRouter.get('', loginRequired, likeController.getLikes);
likeRouter.post('', loginRequired, likeController.addLikes);
likeRouter.delete('/:productId', loginRequired, likeController.deleteLikes);

module.exports = likeRouter;

127.0.0.1:3000/likes?userId=1