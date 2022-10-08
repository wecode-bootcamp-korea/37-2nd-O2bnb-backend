const { productDao } = require('../models');

const getMap = async (keyword) => {

    const product = await productDao.getMap(keyword);

    return product;
}

module.exports = { 
    getMap
}