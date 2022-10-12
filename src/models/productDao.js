const dataSource = require('./dataSource')

const getMap = async (category) => {
    let tmp = "";
    console.log(userId, category)

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
    result.map(el => {
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
    getMap
}