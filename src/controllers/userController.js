const  { userService }  = require('../services');
const { catchAsync } = require('../utils/error');


const getUserInfo = catchAsync(async (req, res) => {

    const userId = req.userId;

    const userInfo = await userService.getUserInfo(userId);

     return res.status(201).json({ message :  userInfo });
  
})

module.exports = {
    getUserInfo
}