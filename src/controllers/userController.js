const  { userService }  = require('../services');
const { catchAsync } = require('../utils/error');


const getUserInfo = catchAsync(async (req, res) => {

    const userId = req.userId;

    const userInfo = await userService.getUserInfo(userId);

     return res.status(201).json({ message :  userInfo });
  
})

const signIn = catchAsync(async (req, res) => {
    const authCode = req.query.code;
    
    if(!authCode){
        const error =  new Error("AUTHCODE_DOESN'T_EXIST");
        error.statusCode = 400;
        throw error;
    }

    const accessToken = await userService.signIn(authCode);

     return res.status(201).json({ accessToken });

})

module.exports = {
    getUserInfo,
    signIn
}