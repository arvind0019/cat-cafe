import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, enum: ['Coffee', 'Tea', 'Desserts', 'Cake', 'Cat Snacks', 'Breakfast', 'Lunch'], required: true },
    price: { type: Number, required: true },
    description: String,
    image: { type: String, default: '/assets/images/menu-latte.svg' },
    available: { type: Boolean, default: true },
    tags: [String]
  },
  { timestamps: true }
);

export default mongoose.model('MenuItem', menuItemSchema);
