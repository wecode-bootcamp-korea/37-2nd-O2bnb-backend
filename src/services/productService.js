const { productDao } = require('../models');

const getProducts = async (userId, category) => {

    const productInfo = await productDao.getProducts(userId, category);

    return productInfo
}

const getProductDetail = async (userId, productId) => {

    const product = await productDao.getProductDetail(userId, productId);
    product.option = await productDao.getProductOption(productId);
    product.notAvailableDate = await productDao.getAvailableDate(productId);
    product.hostInfo = await productDao.getHostInfo(productId);

    return product;
}


const productSearch = async (userId, keyword) => {

    return await productDao.productNameSearch(keyword);
}

const productNameSearch = async (keyword) => {
    
    return await productDao.productNameSearch(keyword);
    
}

const getPriceFilter = async (userId, lowprice, highprice) => {

    return await productDao.getPriceFilter(userId, lowprice, highprice);
}
module.exports = { 
    getProducts,
    getProductDetail,
    getPriceFilter,
    productSearch,
    productNameSearch,
    getPriceFilter
}
