const { userDao } = require('../models');


const getUserInfo = async (userId) => {

	return await userDao.getUserInfo(userId);

}

module.exports = { 
    getUserInfo
}