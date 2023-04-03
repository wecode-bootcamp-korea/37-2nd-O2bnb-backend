const  { productService }  = require('../services');
const { catchAsync } = require('../utils/error')

const getProducts = catchAsync(async (req, res) => {
    const userId = req.userId;

    const category = req.params.category;

    const products = await productService.getProducts(userId, category)

    return res.status(200).json({ message : products })
})
  
const getProductDetail = catchAsync(async (req, res) => {

    const userId = req.userId;

    const productId = req.params.productId;

    const productInfo = await productService.getProductDetail(userId, productId);


    return res.status(200).json({ message : productInfo });
    
})

  const getPriceFilter = catchAsync(async (req, res) => {

    const userId = req.userId;

    const { lowprice, highprice } = req.query;

    const PriceFilter = await productService.getPriceFilter(userId, lowprice, highprice);


    return res.status(200).json({ message : PriceFilter });
  })

const productSearch = catchAsync(async (req, res) => {
    
    const userId = req.userId;

    const keyword = req.query.keyword;

    const products = await productService.productNameSearch(keyword)

    return res.status(200).json({ message : products })
}) 

const productNameSearch = catchAsync(async (req, res) => {

    
    const keyword = req.query.keyword;

    const products = await productService.productNameSearch(keyword)

    return res.status(200).json({ message : products })

}) 


module.exports = {
    getProducts,
    getProductDetail,
    getPriceFilter,
    productSearch,
    productNameSearch
}
