const dataSource = require('./dataSource')

const getMap = async (category) => {
    let tmp = "";

    if (category != "all") tmp = `WHERE address like '%${category}%'`

    const result = await dataSource.query(`
        SELECT 
            id, 
            name, 
            address, 
            latitude, 
            longitude 
        FROM 
            products 
        ` + tmp
    )
    return result;
    
}

const getProducts = async (userId, category) => {

    if (!userId) userId = 0;

    let tmp = "";

    if (category != "all") tmp = `HAVING p.address like '%${category}%'`

    const result = await dataSource.query(`
        SELECT 
            p.id, 
            p.name, 
            p.price,
            p.address,
            CASE WHEN l.user_id = ? THEN 1 ELSE 0 END AS checkLike,
            JSON_ARRAYAGG(i.image_url) AS image_url,
            (SELECT AVG(clean_star + address_star + price_star)/3 as reviewStar FROM reviews WHERE product_id = p.id) as reviewStar
        FROM 
            products p 
        LEFT JOIN likes l ON l.product_id = p.id AND l.user_id = ?
        JOIN product_images i ON i.product_id = p.id 
        GROUP BY p.id ` + tmp,[userId, userId]
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

    return result;

}


const productSearch = async (userId, keyword) => {
    if (!userId) userId = 0;
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

const getProductDetail = async (userId, productId) => {
    if (!userId) userId = 0;

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

const getHostInfo = async (productId) => {
    const [result] = await dataSource.query(`
        SELECT 
            u.name, 
            u.id, 
            u.created_at, 
            h.grade,
            h.content,
            (SELECT 
                    count(*) 
            FROM 
                reviews r 
            JOIN products p ON p.id = r.product_id 
            JOIN hosts h ON h.id = p.host_id 
            WHERE h.id = (SELECT products.host_id from products where products.id = ?)) as reviewCount
        FROM 
            users u 
        JOIN hosts h ON h.user_id = u.id 
        JOIN products p ON p.host_id = h.id 
        WHERE p.id = ?`, [productId, productId]
  )

  return result

};

const productNameSearch = async (keyword) => {

    const result = await dataSource.query(`
        SELECT 
            p.id, 
            p.name, 
            p.address 
        FROM 
            products p 
        WHERE 
            p.address like '%${keyword}%' OR 
            p.name like '%${keyword}%' `

    )
    return result

};

const getPriceFilter = async (userId, lowprice, highprice) => {
    if (!userId) userId = 0;

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
            AVG(r.clean_star+r.address_star+r.price_star)/3 AS reviewStar,         
            JSON_ARRAYAGG(i.image_url) AS image_url 
        FROM 
            products p 
        LEFT JOIN likes l ON p.id = l.product_id AND l.user_id = ?
        JOIN product_images i ON i.product_id = p.id
        LEFT JOIN reviews r ON r.product_id = p.id 
        GROUP BY p.id 
        HAVING p.price >= ${lowprice} and p.price <= ${highprice}`,[userId, userId]
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
    getMap,
    getProductDetail,
    getProductOption,
    getAvailableDate,
    getHostInfo,
    getProducts,
    productSearch,
    productNameSearch,
    getPriceFilter
}