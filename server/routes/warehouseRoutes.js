import { Router } from 'express';
import { getAllWarehouses, getWarehouse, createWarehouse, updateWarehouse, deleteWarehouse } from '../controllers/warehouseController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getAllWarehouses);
router.get('/:slug', getWarehouse);
router.post('/', protect, admin, createWarehouse);
router.put('/:id', protect, admin, updateWarehouse);
router.delete('/:id', protect, admin, deleteWarehouse);

export default router;
