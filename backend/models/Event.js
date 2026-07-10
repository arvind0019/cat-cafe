import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, default: 'Cafe' },
    date: { type: Date, required: true },
    time: String,
    price: { type: Number, default: 0 },
    description: String,
    image: { type: String, default: '/assets/images/event-yoga.svg' },
    capacity: { type: Number, default: 20 }
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);
