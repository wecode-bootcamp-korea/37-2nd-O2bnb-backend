const dataSource = require('./dataSource')

const getReviews = async(productId) => {
  let result = {};
  const stars = await dataSource.query(
    `SELECT
      COUNT(id) as total,
      SUM(clean_star + address_star + price_star) / (COUNT(id) * 3) as totalAvg,
      AVG(clean_star) as cleanAvg,
      AVG(address_star) as addressAvg,
      AVG(price_star) as priceAvg
    FROM reviews
    WHERE product_id = ${productId};
    `
  );
  
  const reviewsByProduct = await dataSource.query(
    `SELECT
      @rownum:=@rownum+1 as id,
      reviews.id as review_id,
      DATE_FORMAT(reviews.created_at, '%Y-%m-%d') as created_at,
      reviews.content,
      users.name,
      users.profile_image
    FROM reviews
    JOIN users ON reviews.user_id = users.id
    WHERE reviews.product_id = ${productId} AND (@rownum:=0)=0;
    `
  );
  
  result.stars = stars;
  result.reviews = reviewsByProduct;

  return result;
};

module.exports = {
  getReviews
}