import { Router } from 'express';
import {
  getAllPricing,
  getPricingByType,
  createPricing,
  updatePricing,
  deletePricing,
  verifyPrice,
} from '../controllers/pricingController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getAllPricing);
router.post('/verify', protect, admin, verifyPrice);
router.get('/:type', getPricingByType);
router.post('/', protect, admin, createPricing);
router.put('/:id', protect, admin, updatePricing);
router.delete('/:id', protect, admin, deletePricing);

export default router;
