import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, enum: ['Coffee Beans', 'Mugs', 'Cat Toys', 'Cat Food', 'T-Shirts', 'Gift Cards'], required: true },
    price: { type: Number, required: true },
    description: String,
    image: { type: String, default: '/assets/images/shop-goods.svg' },
    stock: { type: Number, default: 20 },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
