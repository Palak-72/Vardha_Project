import { Router } from 'express';
import { submitEnquiry, getAllEnquiries, getEnquiry, updateEnquiryStatus, deleteEnquiry } from '../controllers/enquiryController.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().withMessage('Phone is required'),
    validate,
  ],
  submitEnquiry
);

router.get('/', protect, admin, getAllEnquiries);
router.get('/:id', protect, admin, getEnquiry);
router.patch('/:id', protect, admin, [body('status').optional().isString().withMessage('Status must be a string')], validate, updateEnquiryStatus);
router.delete('/:id', protect, admin, deleteEnquiry);

export default router;
