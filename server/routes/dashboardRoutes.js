import { Router } from 'express';
import { getDashboardStats, getLeadStats } from '../controllers/dashboardController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/stats', protect, admin, getDashboardStats);
router.get('/leads', protect, admin, getLeadStats);

export default router;
