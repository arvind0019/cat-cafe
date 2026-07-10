import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quote: { type: String, required: true },
    rating: { type: Number, default: 5 },
    image: { type: String, default: '/assets/images/customer.svg' }
  },
  { timestamps: true }
);

export default mongoose.model('Testimonial', testimonialSchema);
