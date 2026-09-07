import { asyncHandler, apiResponse } from '../utils/apiResponse.js';
import Contact from '../models/Contact.js';
// import { sendCustomerConfirmation, sendInternalNotification } from '../utils/emailService.js';

export const submitContact = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  const contact = await Contact.create({
    name,
    email,
    phone,
    subject,
    message,
  });

  const emailData = {
    name,
    email,
    requestId: contact.requestId,
    type: 'Contact',
    subject,
  };

  // Customer email confirmation
  // Internal team email notification
  // Promise.allSettled([
  //   sendCustomerConfirmation(emailData),
  //   sendInternalNotification({ ...emailData, phone, message }),
  // ]).catch((err) => console.error('Email notification error:', err));

  res.status(201).json({
    success: true,
    message: 'Contact submitted successfully',
    requestId: contact.requestId,
    data: contact,
  });
});

export const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json({ success: true, data: contacts });
});

export const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({ success: false, message: 'Contact not found' });
  }
  res.json({ success: true, data: contact });
});

export const updateContactStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({ success: false, message: 'Contact not found' });
  }
  contact.status = status || contact.status;
  await contact.save();
  res.json({ success: true, message: 'Contact status updated', data: contact });
});

export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({ success: false, message: 'Contact not found' });
  }
  await contact.deleteOne();
  res.json({ success: true, message: 'Contact deleted' });
});
