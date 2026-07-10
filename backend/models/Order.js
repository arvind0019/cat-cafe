import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    customer: { name: String, email: String, phone: String },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: String,
        quantity: { type: Number, default: 1 },
        price: Number
      }
    ],
    total: { type: Number, required: true },
    status: { type: String, enum: ['new', 'paid', 'packed', 'complete', 'cancelled'], default: 'new' }
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
