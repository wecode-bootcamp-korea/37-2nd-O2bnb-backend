const e = require('express');
const { bookDao } = require('../models');

const makeArray = (date1, date2) => {
  const start = new Date(date1);
  const end = new Date(date2);
  let arr = [];

  while (start <= end) {
    let yyyy = start.getFullYear();
    let mm = start.getMonth() + 1;
    mm = mm < 10 ? '0' + mm : mm;
    let dd = start.getDate();
    dd = dd < 10 ? '0' + dd : dd;

    arr.push(yyyy + '-' + mm + '-' + dd);
    start.setDate(start.getDate() + 1)
  }

  return arr;
}

const getBookingsByHotel = async (productId) => {
  const datas = await bookDao.getBookingsByHotel(productId);
  let result = []

  datas.forEach((data) => {
    let newArr = [];
    const checkIn = new Date(data['start_date']);
    const checkOut = new Date(data['end_date']);

    while (checkIn <= checkOut) {
      let yyyy = checkIn.getFullYear();
      let mm = checkIn.getMonth() + 1;
      mm = mm < 10 ? '0' + mm : mm;
      let dd = checkIn.getDate();
      dd = dd < 10 ? '0' + dd : dd;

      newArr.push(yyyy + '-' + mm + '-' + dd);
      checkIn.setDate(checkIn.getDate() + 1)
    }
    result.push(newArr)
  })
  return result;
}

const makeBooking = async (userId, productId, price, guests, startDate, endDate) => {
  const reqDate = makeArray(startDate, endDate);
  console.log('!!!', reqDate);
  const bookedDates = await getBookingsByHotel(productId);

  const checkFirstDay = bookedDates.some((date) => date.slice(0, date.length - 1).includes(reqDate[0]));
  let checkMidDays = 0
  bookedDates.filter((date) => {
    for (let i = 0; i < reqDate.length; i++) {
      if (date.slice(1, date.length - 1).includes(reqDate[i])) checkMidDays++
    }
  });
  const checkLastDay = bookedDates.some((date) => date.slice(1, date.length).includes(reqDate[reqDate.length - 1]));

  if (reqDate.length === 2) {
    if (checkFirstDay === true || checkLastDay === true) {
      const error = new Error('ALREADY_BOOKED! PLEASE SELECT DIFFERENT DATE')
      error.statusCode = 404;
      throw error;
    } else {
      return await bookDao.makeBooking(userId, productId, price, guests, startDate, endDate);
    }
  } else {
    console.log(checkFirstDay, checkMidDays, checkLastDay)
    if (checkFirstDay === true || checkMidDays > 0 || checkLastDay === true) {
      const error = new Error('ALREADY_BOOKED! PLEASE SELECT DIFFERENT DATE')
      error.statusCode = 404;
      throw error;
    } else {
      return await bookDao.makeBooking(userId, productId, price, guests, startDate, endDate);
    }
  }
};

const checkBookingInfo = async (userId) => {
  return await bookDao.checkBookingInfo(userId);
}

const confirmBooking = async (userId, price, guests, startDate, endDate) => {
  const checkAvailableDate = await bookDao.checkAvailableDate(startDate, endDate);
  const checkValidBooking = await bookDao.checkValidBooking(price, guests, startDate, endDate);

  // if ( checkAvailableDate === "1" || checkValidBooking === "0" ) {
  //   const error = new Error('NOT AVAILABLE!_CHECK_YOUR_BOOKING_REQUEST')
  //   error.statusCode = 404;
  //   throw error;
  // }

  return await bookDao.confirmBooking(userId, price, guests, startDate, endDate);
};

const completeBooking = async (userId) => {
  return await bookDao.completeBooking(userId);
};

const getAllBookings = async (userId) => {
  return await bookDao.getAllBookings(userId);
};


const cancelBooking = async (userId, productId, startDate, endDate) => {
  const bookingList = await bookDao.checkBookingList(userId, productId, startDate, endDate);

  if (bookingList === "0") {
    const error = new Error('INVALID_BOOKING')
    error.statusCode = 404;
    throw error;
  }

  return await bookDao.cancelBooking(userId, productId, startDate, endDate);
};

module.exports = {
  makeBooking,
  getAllBookings,
  checkBookingInfo,
  confirmBooking,
  cancelBooking,
  completeBooking,
  getBookingsByHotel
}