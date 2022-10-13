const  { productService }  = require('../services');
const { catchAsync } = require('../utils/error')


const getMap = catchAsync(async (req, res) => {

    const category = req.params.category;

    const mapInfo = await productService.getMap(category);

    return res.status(200).json({ message : mapInfo });
})

const getProductDetail = catchAsync(async (req, res) => {

    const userId = req.userId;

    const productId = req.params.productId;

    const productInfo = await productService.getProductDetail(userId, productId);


    return res.status(200).json({ message : productInfo });
})

const getProducts = catchAsync(async (req, res) => {
  const userId = req.userId;

  const category = req.params.category;

  const products = await productService.getProducts(userId, category)

  return res.status(200).json({ message : products })
  
})

const productSearch = catchAsync(async (req, res) => {
  const userId = req.userId;

  const keyword = req.params.keyword;

  const products = await productService.productSearch(userId, keyword)

  return res.status(200).json({ message : products })
})

const productNameSearch = catchAsync(async (req, res) => {

  const keyword = req.query.keyword;

  if(keyword == "") return res.status(400).json({message : "KEYWORD_DOESNT_EXIST" });

  const products = await productService.productNameSearch(keyword)

  return res.status(200).json({ message : products })
  
}) 


const getPriceFilter = catchAsync(async (req, res) => {

  const userId = req.userId;

  const { lowprice, highprice } = req.query;

  const PriceFilter = await productService.getPriceFilter(userId, lowprice, highprice);


  return res.status(200).json({ message : PriceFilter });
})


module.exports = {
  getMap,
  getProductDetail,
  getProducts,
  productSearch,
  productNameSearch,
  getPriceFilter
}

