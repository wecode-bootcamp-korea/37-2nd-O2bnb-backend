const  { productService }  = require('../services');
const { catchAsync } = require('../utils/error')

  const getProductDetail = catchAsync(async (req, res) => {

    const userId = req.userId;

    const productId = req.params.productId;

    const productInfo = await productService.getProductDetail(userId, productId);


    return res.status(200).json({ message : productInfo });
  })




  module.exports = {
    getProductDetail
}