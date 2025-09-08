import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, index: true },
    imageUrl: { type: String, default: '' },
    stock: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);

export const Item = mongoose.model('Item', itemSchema);


