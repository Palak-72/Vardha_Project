import mongoose from 'mongoose';
import { generateRequestId } from '../utils/requestId.js';

const bookingSchema = mongoose.Schema(
  {
    bookingId: { type: String, unique: true, index: true },
    enquiryId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String },
    warehouseType: { type: String, required: true },
    location: { type: String, required: true },
    areaRequired: { type: String, required: true },
    estimatedAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ['pending', 'demo_paid', 'failed', 'cancelled'],
      default: 'pending',
    },
    paymentMethod: { type: String },
    status: {
      type: String,
      enum: ['confirmed', 'pending', 'cancelled'],
      default: 'confirmed',
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.pre('save', async function (next) {
  if (!this.bookingId) {
    this.bookingId = generateRequestId('BKG');
  }
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
