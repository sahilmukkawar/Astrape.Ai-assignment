import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { createOrder, listOrders } from '../controllers/orderController.js';

const router = Router();

router.post('/', auth, createOrder);
router.get('/', auth, listOrders);

export default router;


