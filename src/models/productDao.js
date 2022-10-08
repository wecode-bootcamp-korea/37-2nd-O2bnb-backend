const dataSource = require('./dataSource')

const productSearch = async (userId, keyword) => {

    const result = await dataSource.query(`
        SELECT 
            p.id, 
            p.name,
            p.price, 
            p.address, 
            CASE WHEN l.user_id = ?
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
            l.user_id = ?
        JOIN 
            product_images i
        ON
            i.product_id = p.id 
        GROUP BY 
            p.id 
        HAVING 
            p.address like '%${keyword}%' OR 
            p.name like '%${keyword}%' `, [userId, userId]
    )

    result.map(el =>{
        if(typeof el.image_url == "string"){
            el.image_url = el.image_url.replace("[",'');
            el.image_url = el.image_url.replace("]",'');
            el.image_url = el.image_url.replace(/"/g,'');
            el.image_url = el.image_url.replace(/ /g,'');
            el.image_url = el.image_url.split(",");
        }
    })
        

    return result

  };

  module.exports = { 
    productSearch
}