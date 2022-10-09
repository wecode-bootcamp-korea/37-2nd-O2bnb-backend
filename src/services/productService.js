const { productDao } = require('../models');

const getProducts = async (userId, category) => {

    return await productDao.getProducts(userId, category);
}

module.exports = { 
    getProducts
}