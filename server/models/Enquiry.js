import mongoose from 'mongoose';
import { generateRequestId } from '../utils/requestId.js';

const enquirySchema = mongoose.Schema(
  {
    requestId: { type: String, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String },
    requirement: { type: String },
    warehouseType: { type: String },
    location: { type: String },
    areaRequired: { type: String },
    message: { type: String },
    status: {
      type: String,
      enum: ['new', 'read', 'responded', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

enquirySchema.pre('save', async function (next) {
  if (!this.requestId) {
    this.requestId = generateRequestId('ENQ');
  }
  next();
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry;
