import { Cart } from '../models/Cart.js';

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId }).populate('items.item');
    res.json(cart || { user: req.userId, items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { itemId, quantity = 1 } = req.body;
    if (!itemId) return res.status(400).json({ message: 'itemId required' });
    let cart = await Cart.findOne({ user: req.userId });
    if (!cart) cart = await Cart.create({ user: req.userId, items: [] });
    const existing = cart.items.find((i) => i.item.toString() === itemId);
    if (existing) existing.quantity += Number(quantity);
    else cart.items.push({ item: itemId, quantity: Number(quantity) });
    await cart.save();
    await cart.populate('items.item');
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    const target = cart.items.find((i) => i.item.toString() === itemId);
    if (!target) return res.status(404).json({ message: 'Item not in cart' });
    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.item.toString() !== itemId);
    } else {
      target.quantity = Number(quantity);
    }
    await cart.save();
    await cart.populate('items.item');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    let cart = await Cart.findOne({ user: req.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.items = cart.items.filter((i) => i.item.toString() !== itemId);
    await cart.save();
    await cart.populate('items.item');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


