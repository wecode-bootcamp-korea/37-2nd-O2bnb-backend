const dataSource = require('./dataSource');
const userDao = require('./userDao.js')
const productDao = require('./productDao.js')
const reviewDao = require('./reviewDao');

module.exports = {
  userDao,
  productDao,
  dataSource,
  reviewDao
}
