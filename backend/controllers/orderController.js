import { Order } from '../models/Order.js';
import { Cart } from '../models/Cart.js';

export const createOrder = async (req, res) => {
  try {
    const { address, paymentMethod } = req.body;
    const cart = await Cart.findOne({ user: req.userId }).populate('items.item');
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });
    const orderItems = cart.items.map((ci) => ({
      item: ci.item._id,
      name: ci.item.name,
      price: ci.item.price,
      quantity: ci.quantity,
      imageUrl: ci.item.imageUrl
    }));
    const total = orderItems.reduce((s, i) => s + i.price * i.quantity, 0);
    const order = await Order.create({ user: req.userId, items: orderItems, total, address, paymentMethod });
    // clear cart
    cart.items = [];
    await cart.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


