const { productDao } = require('../models');

const getProducts = async (userId, category) => {

    const productInfo = await productDao.getProducts(userId, category);

    return productInfo
}

module.exports = { 
    getProducts
}