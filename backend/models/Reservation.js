import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    guests: { type: Number, required: true, min: 1, max: 12 },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    specialRequest: String,
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'confirmed' }
  },
  { timestamps: true }
);

export default mongoose.model('Reservation', reservationSchema);
