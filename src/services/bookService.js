const { bookDao } = require('../models');

const makeBooking = async(userId, productId, price, guests, startDate, endDate) => {
  return await bookDao.makeBooking(userId, productId, price, guests, startDate, endDate);
};

const checkBookingInfo = async(userId) => {
  return await bookDao.checkBookingInfo(userId);
}

const confirmBooking = async(userId, price, guests, startDate, endDate) => {
  const checkAvailableDate = await bookDao.checkAvailableDate(startDate, endDate);
  const checkValidBooking = await bookDao.checkValidBooking(price, guests, startDate, endDate);
  console.log(checkAvailableDate)
  console.log(checkValidBooking)
  // if ( checkAvailableDate === "1" || checkValidBooking === "0" ) {
  //   const error = new Error('NOT AVAILABLE!_CHECK_YOUR_BOOKING_REQUEST')
  //   error.statusCode = 404;
  //   throw error;
  // }
  
  return await bookDao.confirmBooking(userId, price, guests, startDate, endDate);
};

const completeBooking = async(userId) => {
  return await bookDao.completeBooking(userId);
};

const getAllBookings = async(userId) => {
  return await bookDao.getAllBookings(userId);
};


const cancelBooking = async(userId, productId, startDate, endDate) => {
  const bookingList = await bookDao.checkBookingList(userId, productId, startDate, endDate);

  if ( bookingList === "0" ) {
    const error = new Error('INVALID_BOOKING')
    error.statusCode = 404;
    throw error;
  }

  return await bookDao.cancelBooking(userId, productId, startDate, endDate);
};

<<<<<<< HEAD
=======
const completeBooking = async(userId) => {
  return await bookDao.completeBooking(userId);
};

>>>>>>> 8ed8f36... MODIFY : POST, GET, PATCH book API and RESOLVE conflict3
module.exports = {
  makeBooking,
  getAllBookings,
  checkBookingInfo,
  confirmBooking,
  cancelBooking,
  completeBooking
}