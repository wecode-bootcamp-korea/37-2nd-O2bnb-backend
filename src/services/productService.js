const { productDao } = require('../models');

const getProductDetail = async (userId, productId) => {

    const product = await productDao.getProductDetail(userId, productId);
    product.option = await productDao.getProductOption(productId);
    product.notAvailableDate = await productDao.getAvailableDate(productId);

    return product;
}

module.exports = { 
    getProductDetail
}