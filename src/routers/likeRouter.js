const express = require("express");
const { likeController } = require("../controllers");
const { validToken } = require("../utils/auth");

const likeRouter = express.Router();

likeRouter.get('', validToken, likeController.getLikes);
likeRouter.post('/:productId', validToken, likeController.addLikes);
likeRouter.delete('/:productId', validToken, likeController.deleteLikes);

module.exports = likeRouter;
