const { likeDao } = require('../models');

const getLikes = async (userId) => {

  return await likeDao.getLikes(userId);

}

const addLikes = async (userId, productId) => {
    
    likeExists = await likeDao.checkLike(userId, productId)
    
    if(+likeExists){
        const error = new Error("LIKE_ALREADY_EXISTS");
        error.statusCode = 400;
        throw error;
    }
    return await likeDao.createLikes(userId, productId);

}

const deleteLikes = async (userId, productId) => {

  return await likeDao.deleteLikes(userId, productId);

};

module.exports = {
  getLikes,
  addLikes,
  deleteLikes
}