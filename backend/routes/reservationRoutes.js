import express from 'express';
import Reservation from '../models/Reservation.js';
import { adminOnly, protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, async (req, res, next) => {
  try {
    const query = req.user.role === 'admin' ? {} : { email: req.user.email };
    res.json(await Reservation.find(query).sort({ date: -1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const reservation = await Reservation.create({ ...req.body, user: req.user?._id });
    res.status(201).json({ message: 'Reservation confirmed. We saved your table locally.', reservation });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    res.json(await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reservation deleted.' });
  } catch (error) {
    next(error);
  }
});

export default router;
