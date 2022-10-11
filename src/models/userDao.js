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

const getUserBySocialId = async (socialId) => {

	const [user] = await dataSource.query(`
		SELECT 
            id,
            social_id,
            name,
            birth,
            profile_image
		FROM users
		WHERE social_id=?`, [socialId]
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
    getUserBySocialId,
    signUp
}