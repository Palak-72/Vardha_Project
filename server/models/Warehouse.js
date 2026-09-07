import mongoose from 'mongoose';

const warehouseSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    area: { type: String, required: true },
    price: { type: Number, required: true },
    priceUnit: { type: String, default: 'month' },
    minArea: { type: String },
    maxArea: { type: String },
    warehouseType: { type: String, required: true },
    amenities: [{ type: String }],
    images: [{ type: String }],
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['available', 'booked', 'maintenance'],
      default: 'available',
    },
  },
  {
    timestamps: true,
  }
);

warehouseSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  next();
});

const Warehouse = mongoose.model('Warehouse', warehouseSchema);

export default Warehouse;
