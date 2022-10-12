const { likeService } = require('../services');
const { catchAsync } = require('../../utils/error');

const getLikes = catchAsync(async (req, res) => {
  const userId = req.query.userId;
  // const userId = req.user.id;

  const likes = await likeService.getLikes(userId);
  return res.status(200).json({ message : likes });
});

const addLikes = catchAsync(async (req, res) => {
  const { itemId } = req.body;
  // const userId = req.user.id;
  const userId = req.query.userId;

  if(!productId) {
    return res.status(400).json({ message : 'KEY_ERROR'});
  }

  await likeService.addLikes(userId, itemId);
  res.status(201).json({ message : 'USER_LIKES_THIS_ITEM'});
});

const deleteLikes = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  // const userId = req.user.id;
  const userId = req.query.userId

  await likeService.deleteLikes(+productId, userId);
  res.status(204).send();
});

module.exports = {
  getLikes,
  addLikes,
  deleteLikes
};