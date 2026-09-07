import { asyncHandler, apiResponse } from '../utils/apiResponse.js';
import Enquiry from '../models/Enquiry.js';
// import { sendCustomerConfirmation, sendInternalNotification } from '../utils/emailService.js';

export const submitEnquiry = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    company,
    requirement,
    warehouseType,
    location,
    areaRequired,
    message,
  } = req.body;

  const enquiry = await Enquiry.create({
    name,
    email,
    phone,
    company,
    requirement,
    warehouseType,
    location,
    areaRequired,
    message,
  });

  const emailData = {
    name,
    email,
    requestId: enquiry.requestId,
    type: 'Enquiry',
    warehouseType,
    areaRequired,
  };

  // Customer email confirmation
  // Internal team email notification
  // Promise.allSettled([
  //   sendCustomerConfirmation(emailData),
  //   sendInternalNotification({ ...emailData, phone }),
  // ]).catch((err) => console.error('Email notification error:', err));

  res.status(201).json({
    success: true,
    message: 'Enquiry submitted successfully',
    requestId: enquiry.requestId,
    data: enquiry,
  });
});

export const getAllEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await Enquiry.find().sort({ createdAt: -1 });
  res.json({ success: true, data: enquiries });
});

export const getEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) {
    return res.status(404).json({ success: false, message: 'Enquiry not found' });
  }
  res.json({ success: true, data: enquiry });
});

export const updateEnquiryStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) {
    return res.status(404).json({ success: false, message: 'Enquiry not found' });
  }
  enquiry.status = status || enquiry.status;
  await enquiry.save();
  res.json({ success: true, message: 'Enquiry status updated', data: enquiry });
});

export const deleteEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) {
    return res.status(404).json({ success: false, message: 'Enquiry not found' });
  }
  await enquiry.deleteOne();
  res.json({ success: true, message: 'Enquiry deleted' });
});
