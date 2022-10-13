const dataSource = require('./dataSource');

const getLikes = async (userId) => {
    const result = await dataSource.query(`
        SELECT 
            p.id as product_id,
            p.content, 
            p.address, 
            p.price,
            p.latitude,
            p.longitude,
            p.guest_count,
            p.bed_count,
            p.bathroom_count,
            AVG(r.address_star+r.clean_star+r.price_star)/3 as reviewStar,
            JSON_ARRAYAGG(i.image_url) as image_url
        FROM 
            products p 
        JOIN likes l ON l.product_id = p.id AND l.user_id = ?
        JOIN product_images i ON i.product_id = p.id 
        LEFT JOIN reviews r ON r.product_id = p.id
        GROUP BY 
            p.id
      `,[userId]
    );
    result.map(el =>{
        if(typeof el.image_url == "string"){
            el.image_url = el.image_url.replace("[",'');
            el.image_url = el.image_url.replace("]",'');
            el.image_url = el.image_url.replace(/"/g,'');
            el.image_url = el.image_url.replace(/ /g,'');
            el.image_url = el.image_url.split(",");
            }
        })

    return result;
  };

const checkLike = async(userId, productId) => {

    const [result] = await dataSource.query(`
        SELECT EXISTS(
            SELECT 
                * 
            FROM 
                likes 
            WHERE 
                user_id = ? and product_id = ?
        ) AS boolean;
    `, [userId,productId]
    );

    return result.boolean;
  };
  
const createLikes = async(userId, productId) => {
  return await dataSource.query(`
    INSERT INTO likes (
      user_id, 
      product_id
    )
    VALUES(
        ?, 
        ?
        )`, [userId,productId]
  );
};

const deleteLikes = async(userId, productId) => {

    return await dataSource.query(`
    DELETE FROM
        likes
    WHERE 
        user_id = ? and product_id = ?
    `, [userId, productId]
    );

};

module.exports = {
  getLikes,
  createLikes,
  deleteLikes,
  checkLike
}