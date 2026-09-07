import mongoose from 'mongoose';

const pricingSchema = mongoose.Schema(
  {
    warehouseType: { type: String, required: true, unique: true },
    pricePerSqFt: { type: Number, required: true },
    minArea: { type: String, required: true },
    maxArea: { type: String },
    deposit: { type: Number, default: 0 },
    maintenance: { type: Number, default: 0 },
    currency: { type: String, default: 'INR' },
    billingCycle: { type: String, default: 'monthly' },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Pricing = mongoose.model('Pricing', pricingSchema);

export default Pricing;
