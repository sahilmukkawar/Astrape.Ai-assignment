import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    name: String,
    price: Number,
    quantity: Number,
    imageUrl: String
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    address: {
      name: String,
      address: String,
      city: String,
      zip: String
    },
    paymentMethod: { type: String, enum: ['cod', 'card'], default: 'cod' },
    status: { type: String, enum: ['placed', 'paid', 'shipped', 'delivered'], default: 'placed' }
  },
  { timestamps: true }
);

export const Order = mongoose.model('Order', orderSchema);


