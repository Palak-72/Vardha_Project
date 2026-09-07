import { Router } from 'express';
import { login, getProfile, updateProfile, changePassword } from '../controllers/authController.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/admin/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validate,
], login);

router.get('/admin/me', protect, getProfile);
router.put('/admin/me', protect, [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  validate,
], updateProfile);
router.post('/admin/change-password', protect, [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  validate,
], changePassword);

export default router;
