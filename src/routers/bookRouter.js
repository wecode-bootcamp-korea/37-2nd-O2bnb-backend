const express = require('express');

const { bookController } = require('../controllers');
const { validToken } = require('../utils/auth');

const router = express.Router();

router.post('/:productId', bookController.makeBooking);
router.get('/all', bookController.getAllBookings);
router.get('/order', bookController.checkBookingInfo);
router.patch('/confirm/order', bookController.confirmBooking);
router.get('/payment', bookController.completeBooking);
router.patch('/cancel/:productId', bookController.cancelBooking);

module.exports = router;