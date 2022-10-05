const { likeDao } = require('../models');

const getLikes = async (userId) => {
  return await likeDao.getLikes(userId);
}

const addLikes = async (userId, productId) => {
  return await likeDao.addLikes(userId, productId);
}

const deleteLikes = async (userId, productId) => {
  return await likeDao.deleteLikes(userId, productId);
};

module.exports = {
  getLikes,
  addLikes,
  deleteLikes
}