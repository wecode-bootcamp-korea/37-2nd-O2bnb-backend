const express = require("express");
const { likeController } = require("../controllers");
const { validToken } = require("../../utils/auth");

const likeRouter = express.Router();

likeRouter.get('', likeController.getLikes);
likeRouter.post('', validToken, likeController.addLikes);
likeRouter.delete('/:productId', validToken, likeController.deleteLikes);

module.exports = likeRouter;


// get method // ip:3000/likes // 기능
// post method // ip:3000/likes // 기능
// delete method // ip:3000/likes/:productId

