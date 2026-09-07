import { asyncHandler } from '../utils/apiResponse.js';
import Warehouse from '../models/Warehouse.js';

export const getAllWarehouses = asyncHandler(async (req, res) => {
  const { type, status, featured } = req.query;
  const filter = {};
  if (type) filter.warehouseType = type;
  if (status) filter.status = status;
  if (featured !== undefined) filter.featured = featured === 'true';
  const warehouses = await Warehouse.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, data: warehouses });
});

export const getWarehouse = asyncHandler(async (req, res) => {
  const warehouse = await Warehouse.findOne({ slug: req.params.slug });
  if (!warehouse) {
    return res.status(404).json({ success: false, message: 'Warehouse not found' });
  }
  res.json({ success: true, data: warehouse });
});

export const createWarehouse = asyncHandler(async (req, res) => {
  const warehouse = await Warehouse.create(req.body);
  res.status(201).json({ success: true, message: 'Warehouse created', data: warehouse });
});

export const updateWarehouse = asyncHandler(async (req, res) => {
  const warehouse = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!warehouse) {
    return res.status(404).json({ success: false, message: 'Warehouse not found' });
  }
  res.json({ success: true, message: 'Warehouse updated', data: warehouse });
});

export const deleteWarehouse = asyncHandler(async (req, res) => {
  const warehouse = await Warehouse.findByIdAndDelete(req.params.id);
  if (!warehouse) {
    return res.status(404).json({ success: false, message: 'Warehouse not found' });
  }
  res.json({ success: true, message: 'Warehouse deleted' });
});
