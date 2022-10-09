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

const getPriceFilter = async (userId, lowprice, highprice) => {

    const PriceFilter = await productDao.getPriceFilter(userId, lowprice, highprice);

    return PriceFilter;
}


module.exports = { 
    getProducts,
    getProductDetail,
    getPriceFilter
}

