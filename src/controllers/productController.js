const  { productService }  = require('../services');
const { catchAsync } = require('../utils/error')

  const getPriceFilter = catchAsync(async (req, res) => {

    const userId = req.userId;

    const { lowprice, highprice } = req.query;

    const PriceFilter = await productService.getPriceFilter(userId, lowprice, highprice);


    return res.status(200).json({ message : PriceFilter });
  })




  module.exports = {
    getPriceFilter
}