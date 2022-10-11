const  { productService }  = require('../services');
const { catchAsync } = require('../utils/error')


const getMap = catchAsync(async (req, res) => {

    const keyword = req.params.keyword;

    const mapInfo = await productService.getMap(keyword);

    return res.status(200).json({ message : mapInfo });
})

const getProductDetail = catchAsync(async (req, res) => {

    const userId = req.userId;

    const productId = req.params.productId;

    const productInfo = await productService.getProductDetail(userId, productId);


    return res.status(200).json({ message : productInfo });
})




  module.exports = {
    getMap,
    getProductDetail
}
