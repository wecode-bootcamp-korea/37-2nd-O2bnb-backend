const  { productService }  = require('../services');
const { catchAsync } = require('../utils/error')

const productSearch = catchAsync(async (req, res) => {
    const userId = req.userId;

    const keyword = req.params.keyword;

    const products = await productService.productSearch(userId, keyword)

    return res.status(200).json({ message : products })
})

module.exports = {
    productSearch
}