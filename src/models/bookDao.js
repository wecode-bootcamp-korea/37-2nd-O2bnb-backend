const dataSource = require('./dataSource')

const makeBooking = async(userId, productId, price, guests, startDate, endDate) => {
  const result = await dataSource.query(
    `INSERT INTO bookings(
      user_id,
      product_id,
      price,
      guest_count,
      start_date,
      end_date,
      booking_status_id
    ) VALUES (?, ?, ?, ?, ?, ?, 3)
    `, [userId, productId, price, guests, startDate, endDate]
  );
  
  return result;
};

const getAllBookings = async(userId) => {
  return await dataSource.query(
    `SELECT
      products.name as product_name,
      users.name as host_name,
      bookings.start_date,
      bookings.end_date,
      products.address,
      (SELECT product_images.image_url FROM product_images JOIN products ON product_images.product_id = products.id LIMIT 1) as img
    FROM products
    JOIN hosts ON hosts.id = products.host_id
    JOIN users ON users.id = hosts.user_id
    JOIN bookings ON bookings.product_id = products.id
    WHERE bookings.user_id = ${userId} AND bookings.booking_status_id = 1
    `
  );
};

const checkBookingInfo = async(userId) => {

  return await dataSource.query(
    `SELECT
      bookings.price as totalPrice,
      bookings.guest_count,
      bookings.start_date,
      bookings.end_date,
      (bookings.end_date - bookings.start_date) as nights,
      (SELECT product_images.image_url FROM product_images JOIN products ON product_images.product_id = products.id LIMIT 1) as img,
      products.name,
      products.content,
      products.price
    FROM bookings
    JOIN products ON products.id = bookings.product_id
    WHERE bookings.user_id = ?
    AND bookings.booking_status_id = 3
    ORDER BY bookings.created_at DESC
    LIMIT 1
    `, [userId]
  )
}

const checkAvailableDate = async(startDate, endDate) => {
  const result = await dataSource.query(
  `SELECT EXISTS (
    SELECT *
    FROM bookings
    WHERE booking_status_id = 1 AND
      (? BETWEEN start_date and DATE_SUB(end_date, INTERVAL 1 DAY)
      OR ? BETWEEN DATE_ADD(start_date, INTERVAL 1 DAY) and end_date)
      ORDER BY bookings.created_at DESC
      LIMIT 1
  ) AS trueORfalse
    `, [startDate, endDate]
  )

  return result[0].trueORfalse;
}

const checkValidBooking = async(price, guests, startDate, endDate) => {
  const result = await dataSource.query(
  `SELECT EXISTS (
    SELECT *
    FROM bookings
    WHERE price = ?
      AND guest_count = ?
      AND start_date = ?
      AND end_date = ?
      AND booking_status_id = 3
  ) AS trueORfalse
    `, [price, guests, startDate, endDate]
  )

  return result[0].trueORfalse;
}

const confirmBooking = async(userId, price, guests, startDate, endDate) => {
  console.log(startDate)
  return await dataSource.query(
    `UPDATE bookings
    SET booking_status_id = 1
    WHERE user_id = ?
      AND price = ?
      AND guest_count = ?
      AND start_date = ?
      AND end_date = ?
    `, [userId, price, guests, startDate, endDate]
  );
};

const cancelBooking = async(userId, productId, startDate, endDate) => {
  return await dataSource.query(
    `UPDATE bookings
    SET booking_status_id = 2
    WHERE user_id = ?
      AND product_id = ?
      AND start_date = ?
      AND end_date = ?
      AND booking_status_id = 1
    `, [userId, productId, startDate, endDate]
  );
};

const checkBookingList = async(userId, productId, startDate, endDate) => {
  const result = await dataSource.query(
    `SELECT EXISTS (
      SELECT *
      FROM bookings
      WHERE user_id = ?
        AND product_id = ?
        AND start_date = ?
        AND end_date = ?
        AND booking_status_id = 1
      ) AS trueORfalse
      `, [userId, productId, startDate, endDate]
  );

  return result[0].trueORfalse;
};

const completeBooking = async(userId) => {
  return await dataSource.query(
    `SELECT
      price,
      guest_count,
      start_date,
      end_date
    FROM bookings
    WHERE user_id = ?
    AND booking_status_id = 1
    ORDER BY bookings.created_at DESC
    LIMIT 1
    `, [userId]
  );
};    

module.exports = {
  makeBooking,
  getAllBookings,
  checkBookingInfo,
  checkAvailableDate,
  checkValidBooking,
  checkBookingList,
  confirmBooking,
  cancelBooking,
  completeBooking
}