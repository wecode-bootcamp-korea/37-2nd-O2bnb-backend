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

const getProducts = async (userId, category) => {

    const productInfo = await productDao.getProducts(userId, category);

    return productInfo
}

const productSearch = async (userId, keyword) => {

    return await productDao.productSearch(userId, keyword);
}

const productNameSearch = async (keyword) => {

    return await productDao.productNameSearch(keyword);
}

module.exports = { 
    getMap,
    getProductDetail,
    getProducts,
    productSearch,
    productNameSearch
}

