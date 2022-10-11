const dataSource = require('./dataSource')

const getMap = async (keyword) => {
    let tmp = "";

    if (keyword != "all") tmp = `WHERE address like '%${keyword}%'`

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

    return result

  };

  module.exports = { 
    getMap
}