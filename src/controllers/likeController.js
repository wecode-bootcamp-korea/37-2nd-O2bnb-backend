const { likeService } = require('../services');
const { catchAsync } = require('../utils/error');

const getLikes = catchAsync(async (req, res) => {

    const userId = req.userId;

    const likesList = await likeService.getLikes(userId);

    return res.status(200).json({ message : likesList });

});

const addLikes = catchAsync(async (req, res) => {

  const { productId } = req.params;
  const userId = req.userId;

  if(!productId) {
    return res.status(400).json({ message : 'CHECK_PRODUCT'});
  }

  await likeService.addLikes(userId, productId);
  return res.status(201).json({ message : 'USER_LIKES_THIS_ITEM'});

});

const deleteLikes = catchAsync(async (req, res) => {

  const productId = req.params.productId;
  const userId = req.userId;

  await likeService.deleteLikes(userId, productId);

  return res.status(201).json({ message : 'SUCCESS_DELETELIKE'});

});

module.exports = {
  getLikes,
  addLikes,
  deleteLikes
};