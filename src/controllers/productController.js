const  { productService }  = require('../services');
const { catchAsync } = require('../utils/error')

const getProducts = catchAsync(async (req, res) => {
    const userId = req.userId;

    const category = req.params.category;

    const products = await productService.getProducts(userId, category)

    return res.status(200).json({ message : products })
})

module.exports = {
    getProducts
}