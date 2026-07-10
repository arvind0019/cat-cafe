import mongoose from 'mongoose';

const catSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Female', 'Male'], required: true },
    photo: { type: String, default: '/assets/images/cat-luna.svg' },
    favoriteToy: String,
    favoriteFood: String,
    personality: String,
    healthStatus: { type: String, default: 'Vaccinated and healthy' },
    available: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Cat', catSchema);
