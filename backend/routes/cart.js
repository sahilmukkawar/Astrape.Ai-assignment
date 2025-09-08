import { Router } from 'express';
import { getCart, addToCart, updateCartItem, removeFromCart } from '../controllers/cartController.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.get('/', auth, getCart);
router.post('/', auth, addToCart);
router.put('/', auth, updateCartItem);
router.delete('/:itemId', auth, removeFromCart);

export default router;


