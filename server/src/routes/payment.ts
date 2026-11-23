import { Router } from 'express';
import { initializePayment, verifyPayment } from '../controllers/paymentController.js';

const router = Router();

// POST to initialize a transaction
router.post('/initialize', initializePayment);

// GET to verify a transaction after payment
router.get('/verify/:reference', verifyPayment);

export default router;