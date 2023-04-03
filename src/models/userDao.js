const dataSource = require('./dataSource')

const getUserInfo = async (userId) => {

	const [user] = await dataSource.query(`
        SELECT 
            email, 
            birth, 
            name,
            profile_image, 
            created_at 
        FROM 
            users 
        WHERE id = ?;`, [userId]
	)

    return user;
}

module.exports = { 
    getUserInfo
}