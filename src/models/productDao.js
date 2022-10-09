const dataSource = require('./dataSource')

const getProductDetail = async (userId, productId) => {

    const [result] = await dataSource.query(`
        SELECT 
            p.*,  
            CASE WHEN l.user_id = ? THEN 1 ELSE 0 END AS likeCheck, 
            JSON_ARRAYAGG(i.image_url) AS image_url 
        FROM 
            products p 
        LEFT JOIN likes l ON p.id = l.product_id AND l.user_id = ?
        JOIN product_images i ON i.product_id = p.id 
        GROUP BY 
            p.id 
        HAVING 
            p.id = ?`, [userId, userId, productId]
  )

  if(typeof result.image_url == "string"){
    result.image_url = result.image_url.replace("[",'');
    result.image_url = result.image_url.replace("]",'');
    result.image_url = result.image_url.replace(/"/g,'');
    result.image_url = result.image_url.replace(/ /g,'');
    result.image_url = result.image_url.split(",");
  }

  return result;

};

const getProductOption = async (productId) => {
    const result = await dataSource.query(`
        SELECT 
            o.amenity, 
            o.icon_url 
        FROM 
            options o 
        JOIN 
            products_options po 
        ON 
            po.option_id = o.id AND 
            po.product_id = ?`, [productId]
  )

  return result

};

const getAvailableDate = async (productId) => {
    const result = await dataSource.query(`
        SELECT 
            start_date,
            end_date 
        FROM 
            bookings 
        WHERE 
            product_id = ? AND 
            booking_status_id = 2;`, [productId]
  )

  return result

};



module.exports = { 
    getProductDetail,
    getProductOption,
    getAvailableDate
}