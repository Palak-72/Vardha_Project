import mongoose from 'mongoose';
import { generateRequestId } from '../utils/requestId.js';

const contactSchema = mongoose.Schema(
  {
    requestId: { type: String, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String },
    message: { type: String, required: true },
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

contactSchema.pre('save', async function (next) {
  if (!this.requestId) {
    this.requestId = generateRequestId('CNT');
  }
  next();
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
