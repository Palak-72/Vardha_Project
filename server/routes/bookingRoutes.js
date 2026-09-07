import { Router } from 'express';
import { demoPayment, getAllBookings, getBooking } from '../controllers/bookingController.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

router.post(
  '/demo-payment',
  [
    body('enquiryId').notEmpty().withMessage('Enquiry ID is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('warehouseType').notEmpty().withMessage('Warehouse type is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('areaRequired').notEmpty().withMessage('Area required is required'),
    body('estimatedAmount').notEmpty().withMessage('Estimated amount is required'),
    validate,
  ],
  demoPayment
);

router.get('/', protect, admin, getAllBookings);
router.get('/:id', protect, admin, getBooking);

export default router;
