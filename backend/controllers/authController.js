import jwt from 'jsonwebtoken';
import User from '../models/User.js';

function sign(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'change-this-local-secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
}

function userPayload(user) {
  return { id: user._id, name: user.name, email: user.email, role: user.role, wishlist: user.wishlist, favoriteCats: user.favoriteCats };
}

export async function register(req, res, next) {
  try {
    const count = await User.countDocuments();
    const role = count === 0 ? 'admin' : 'user';
    const user = await User.create({ ...req.body, role });
    res.status(201).json({ token: sign(user), user: userPayload(user) });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email }).select('+password');
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    res.json({ token: sign(user), user: userPayload(user) });
  } catch (error) {
    next(error);
  }
}

export async function forgotPassword(req, res) {
  res.json({ message: 'Offline demo reset: contact the cafe admin to reset this local account.', email: req.body.email });
}

export async function me(req, res) {
  res.json(req.user);
}

export async function updateProfile(req, res, next) {
  try {
    const allowed = ['name', 'phone', 'address', 'wishlist', 'favoriteCats'];
    const update = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
    const user = await User.findByIdAndUpdate(req.user._id, update, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    next(error);
  }
}
