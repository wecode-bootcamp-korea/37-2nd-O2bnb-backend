const express = require('express');

const { bookController } = require('../controllers');
const { validToken } = require('../utils/auth');

const router = express.Router();

router.get('/all', validToken, bookController.getAllBookings);
router.get('/order', validToken, bookController.checkBookingInfo);
router.patch('/confirm/order', validToken, bookController.confirmBooking);
router.get('/payment', validToken ,bookController.completeBooking);
router.patch('/cancel/:productId', validToken, bookController.cancelBooking);
router.post('/:productId', validToken, bookController.makeBooking);

module.exports = router;