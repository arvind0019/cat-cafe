import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, enum: ['Cats', 'Coffee', 'Interior', 'Desserts', 'Customers'], required: true },
    image: { type: String, required: true },
    caption: String,
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Gallery', gallerySchema);
