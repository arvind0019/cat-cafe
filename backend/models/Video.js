import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, default: 'Cafe Experience' },
    url: { type: String, required: true },
    poster: String,
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Video', videoSchema);
