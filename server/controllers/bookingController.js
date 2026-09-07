import { asyncHandler, apiResponse } from '../utils/apiResponse.js';
import Booking from '../models/Booking.js';
// import { sendCustomerConfirmation, sendInternalNotification } from '../utils/emailService.js';

export const demoPayment = asyncHandler(async (req, res) => {
  const {
    enquiryId,
    name,
    email,
    phone,
    company,
    warehouseType,
    location,
    areaRequired,
    estimatedAmount,
    paymentMethod = 'UPI',
  } = req.body;

  const booking = await Booking.create({
    enquiryId,
    name,
    email,
    phone,
    company,
    warehouseType,
    location,
    areaRequired,
    estimatedAmount,
    paymentStatus: 'demo_paid',
    paymentMethod,
    status: 'confirmed',
  });

  const emailData = {
    name,
    email,
    requestId: booking.bookingId,
    type: 'Booking Confirmation',
    warehouseType,
    areaRequired,
  };

  // Customer email confirmation
  // Internal team email notification
  // Promise.allSettled([
  //   sendCustomerConfirmation(emailData),
  //   sendInternalNotification({ ...emailData, phone }),
  // ]).catch((err) => console.error('Email notification error:', err));

  apiResponse(res, 201, true, 'Demo payment processed successfully', booking);
});

export const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  apiResponse(res, 200, true, 'Bookings fetched', bookings);
});

export const getBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return apiResponse(res, 404, false, 'Booking not found');
  }
  apiResponse(res, 200, true, 'Booking fetched', booking);
});
