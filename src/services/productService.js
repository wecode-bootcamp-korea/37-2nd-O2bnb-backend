const { productDao } = require('../models');

const productSearch = async (userId, keyword) => {

    return await productDao.productSearch(userId, keyword);
}

module.exports = { 
    productSearch
}