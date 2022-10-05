const dataSource = require('./dataSource');

const getLikes = async (userId) => {
  ```
  PESUDO CODE 
  - 목적 : 클라이언트에게 위시리스트 반환
  - input : user_id 가 들어옴 
  (인가과정에 쓰이는 토큰으로 안에 들어있는 payload 속 user_id 확인)
  - output : 위시리스트 (객체들의 배열로 반환)
    - ex => [
      {
        id : 1,
        content : 우리 숙소 좋아요,
        address : 테헤란로 427,
        bed_count : 2,
        image : http://url.com,
        . . .
      },
      {
        id : 2,
        content : 우리 숙소 좋아요,
        address : 테헤란로 427,
        bed_count : 2,
        image : http://url.com,
        . . .
      }
    ]
    - likes 테이블에서 input으로 들어온 user_id를 찾고 어떤 product_id를 좋아요 눌렀는지 확인
      - product id -> product table
      - product content -> product table
      - product address -> product table
      - product bed_count -> product table
      - product image -> product_images table에서 해당 product_id를 찾는다.
      - product rating -> reviews table에서 해당 product_id의 리뷰들을 찾고 그 리뷰들의 평점을 평균
      - product review_count -> reviews table 해당 product_id의 리뷰들 개수 총합
  
  -> likes 테이블을 기준으로 products, product_images, reviews table JOIN!
  => 이거를 SQL문으로 작성!


  SQL => 
    SELECT 
      . . .
    FROM likes
    JOIN products ON . . .
    JOIN product_images ON . . .
    JOIN reviews ON . . .
    WHERE likes.user_id = (input으로 들어오는 userId)

  1단계 - likes 테이블에서 해당하는 유저 data만 select 
  2단계 - products 테이블 조인해서 그 유저가 좋아하는 product list select
  3단계 - product_images 테이블까지 조인해서 이미지까지 select 
  ```
    let result = await database.query(
      `
      SELECT 
        products.id,
        products.content,
        products.bed_count,
        products.address,
        likes.product_id
        product_images.img_url
      FROM products
      JOIN likes ON likes.products_id = products.id
      JOIN  
      WHERE likes.user_id = ?
      `,
      [userId]
    );
  };

  //전체 리스트 ..?
// const createLikes = async(id, product_id) => {
//   return await database.query(
//     `
//     INSERT INTO likes (
//       product_id
//     )
//     VALUES ()
//     `,
//     [product_id]
//   );
// };

const deleteLikes = async(id, product_id) => {
  return await database.query(
    `
    DELETE FROM
    likes
    WHERE product_id =?
    `,
    [product_id]
  );
};

module.exports = {
  getLikes,
  //createLikes,
  deleteLikes
}

