const  { productService }  = require('../services');
const { catchAsync } = require('../utils/error')

const getMap = catchAsync(async (req, res) => {

    const keyword = req.params.keyword;

    const mapInfo = await productService.getMap(keyword);

    return res.status(200).json({ message : mapInfo });
})

  module.exports = {
    getMap
}