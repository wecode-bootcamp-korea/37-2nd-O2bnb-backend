const jwt = require('jsonwebtoken')
const axios = require('axios')

const { userDao } = require('../models');



const getUserInfo = async (userId) => {

	return await userDao.getUserInfo(userId);
}


const signIn = async (authCode) => {

    const clientId = process.env.CLIENT_ID;
    const redirect_uri = process.env.REDIRECT_URI;

    const getToken = await axios({
        url:`https://kauth.kakao.com/oauth/token`,
        method: 'POST',
        headers:{ 
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data : `grant_type=authorization_code&client_id=${clientId}&redirect_uri=${redirect_uri}&code=${authCode}`
    });

    const UserData = await axios({
        url:`https://kapi.kakao.com/v2/user/me`,
        method: 'GET',
        headers:{
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        "Authorization" : `Bearer ${getToken.data.access_token}`
        }
    });

    const socialUser = UserData.data;
    
    const { birth, email } = socialUser.kakao_account;
    const socialId =  socialUser.id;
    const name = socialUser.properties.nickname;
    const profileImage = socialUser.kakao_account.profile.profile_image_url;

	let user = await userDao.getUserByemail(email);
    
    if(!user){
        await userDao.signUp(socialId, email, name, birth, profileImage);
        user = await userDao.getUserBySocialId(socialId);
    }

	const accessToken = jwt.sign({ user_id : user.id }, process.env.KEY)

	return accessToken

}

module.exports = { 
    getUserInfo,
    signIn
}