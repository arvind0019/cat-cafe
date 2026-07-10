import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    name: String,
    message: String
  },
  { timestamps: true }
);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    excerpt: String,
    content: { type: String, required: true },
    image: { type: String, default: '/assets/images/blog-care.svg' },
    author: { type: String, default: 'Velvet Paw Editorial' },
    comments: [commentSchema]
  },
  { timestamps: true }
);

export default mongoose.model('Blog', blogSchema);
