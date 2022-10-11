const { productDao } = require('../models');

const getMap = async (keyword) => {

    const product = await productDao.getMap(keyword);

    return product;
}

const getProductDetail = async (userId, productId) => {

    const product = await productDao.getProductDetail(userId, productId);
    product.option = await productDao.getProductOption(productId);
    product.notAvailableDate = await productDao.getAvailableDate(productId);
    product.hostInfo = await productDao.getHostInfo(productId);

    return product;
}

module.exports = { 
    getMap,
    getProductDetail
}