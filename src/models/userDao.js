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

const getUserByemail = async (email) => {

	const [user] = await dataSource.query(`
		SELECT 
            id,
            social_id,
            name,
            birth,
            profile_image
		FROM users
		WHERE email=?`, [email]
	)

    return user;
}

const signUp = async (socialId, email, name, birth, profileImage) => {

    return await dataSource.query(`
        INSERT INTO users (
          social_id, email, name, birth, profile_image
          ) VALUES (
                  ?,
                  ?, 
                  ?, 
                  ?,
                  ?
          )`,
      [socialId, email, name, birth, profileImage]
    )
}

module.exports = { 
    getUserInfo,
    getUserByemail,
    signUp
}