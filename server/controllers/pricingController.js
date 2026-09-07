import { asyncHandler } from '../utils/apiResponse.js';
import Pricing from '../models/Pricing.js';

export const getAllPricing = asyncHandler(async (req, res) => {
  const pricings = await Pricing.find({ active: true }).sort({ warehouseType: 1 });
  res.json({ success: true, data: pricings });
});

export const getPricingByType = asyncHandler(async (req, res) => {
  const pricing = await Pricing.findOne({ warehouseType: req.params.type, active: true });
  if (!pricing) {
    return res.status(404).json({ success: false, message: 'Pricing not found for this warehouse type' });
  }
  res.json({ success: true, data: pricing });
});

export const createPricing = asyncHandler(async (req, res) => {
  const pricing = await Pricing.create(req.body);
  res.status(201).json({ success: true, message: 'Pricing created', data: pricing });
});

export const updatePricing = asyncHandler(async (req, res) => {
  const pricing = await Pricing.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!pricing) {
    return res.status(404).json({ success: false, message: 'Pricing not found' });
  }
  res.json({ success: true, message: 'Pricing updated', data: pricing });
});

export const deletePricing = asyncHandler(async (req, res) => {
  const pricing = await Pricing.findByIdAndDelete(req.params.id);
  if (!pricing) {
    return res.status(404).json({ success: false, message: 'Pricing not found' });
  }
  res.json({ success: true, message: 'Pricing deleted' });
});

export const verifyPrice = asyncHandler(async (req, res) => {
  const { warehouseType, area, durationMonths = 1 } = req.body;
  const pricing = await Pricing.findOne({ warehouseType, active: true });
  if (!pricing) {
    return res.status(404).json({ success: false, message: 'Pricing not found for this warehouse type' });
  }
  const areaNum = parseFloat(area);
  if (isNaN(areaNum) || areaNum <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid area value' });
  }
  const baseRent = pricing.pricePerSqFt * areaNum * durationMonths;
  const total = baseRent + pricing.deposit + pricing.maintenance * durationMonths;
  res.json({
    success: true,
    data: {
      warehouseType: pricing.warehouseType,
      area,
      durationMonths,
      pricePerSqFt: pricing.pricePerSqFt,
      baseRent: Math.round(baseRent),
      deposit: pricing.deposit,
      maintenance: Math.round(pricing.maintenance * durationMonths),
      total: Math.round(total),
      currency: pricing.currency,
      billingCycle: pricing.billingCycle,
    },
  });
});
