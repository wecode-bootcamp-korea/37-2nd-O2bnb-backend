const dataSource = require('./dataSource')

const getProducts = async (userId, category) => {
    let tmp = "";

    if (category != "all") tmp = `HAVING p.address like '%${category}%'`

    const result = await dataSource.query(`
        SELECT 
            p.id, 
            p.name,
            p.price, 
            p.address, 
            CASE WHEN l.user_id = ${userId}
                THEN 
                    1 
                ELSE 
                    0 END AS likeCheck, 
            JSON_ARRAYAGG(i.image_url) AS image_url 
        FROM 
            products p 
        LEFT JOIN 
            likes l 
        ON 
            p.id = l.product_id AND
            l.user_id = ${userId} 
        JOIN 
            product_images i
        ON
            i.product_id = p.id 
        GROUP BY 
            p.id ` + tmp
    )

    return result
  
  };

  module.exports = { 
    getProducts
}