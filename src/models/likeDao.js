const dataSource = require('./dataSource');

const getLikes = async (userId) => {
    return await dataSource.query(
      `
      SELECT 
        p.id as product_id,
        p.content, 
        p.address, 
        p.price,
        p.latitude,
        p.longitude,
        COUNT(r.id) AS total, SUM(r.clean_star + r.address_star + r.price_star)/(COUNT(r.id)*3) AS totalAVG,
        AVG(r.clean_star) AS cleanAVG,
        AVG(r.address_star) AS addressAVG,
        AVG(r.price_star) AS priceAVG,
        json_arrayagg(i.image_url) as image
      FROM 
      products p 
      JOIN likes l ON l.product_id = p.id AND l.user_id = ? 
      JOIN product_images i ON i.product_id = p.id 
      JOIN reviews r ON r.user_id = l.user_id
      WHERE l.user_id = 1
      GROUP BY p.id;
      `,
      [userId]
    );
  };

const createLikes = async(id, productId) => {
  return await dataSource.query(
    `
    INSERT INTO likes (
      user_id, product_id
    )
    VALUES (?, ?)
    `,
    [id,productId]
  );
};

const deleteLikes = async(id, productId) => {
  return await dataSource.query(
    `
    DELETE FROM
    likes
    WHERE product_id =?
    `,
    [productId]
  );
};

module.exports = {
  getLikes,
  createLikes,
  deleteLikes
}
