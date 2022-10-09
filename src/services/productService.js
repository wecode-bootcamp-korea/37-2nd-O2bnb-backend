const { productDao } = require('../models');

const getPriceFilter = async (userId, lowprice, highprice) => {

    const PriceFilter = await productDao.getPriceFilter(userId, lowprice, highprice);

    return PriceFilter;
}

module.exports = { 
    getPriceFilter
}