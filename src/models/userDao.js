const dataSource = require('./dataSource')

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

const createSignUp = async (socialId, email, name, birth, profileImage) => {

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
    getUserBySocialId,
    createSignUp
}