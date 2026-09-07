import { Router } from 'express';
import { submitContact, getAllContacts, getContact, updateContactStatus, deleteContact } from '../controllers/contactController.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').notEmpty().withMessage('Message is required'),
    validate,
  ],
  submitContact
);

router.get('/', protect, admin, getAllContacts);
router.get('/:id', protect, admin, getContact);
router.patch('/:id', protect, admin, [body('status').optional().isString().withMessage('Status must be a string')], validate, updateContactStatus);
router.delete('/:id', protect, admin, deleteContact);

export default router;
