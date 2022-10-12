const { reviewDao } = require('../models');

const getReviews = async(productId) => {

  return await reviewDao.getReviews(productId);
  
};

module.exports = {
  getReviews
}