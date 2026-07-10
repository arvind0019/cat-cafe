import express from 'express';
import Blog from '../models/Blog.js';
import Cat from '../models/Cat.js';
import ContactMessage from '../models/ContactMessage.js';
import Event from '../models/Event.js';
import Gallery from '../models/Gallery.js';
import MenuItem from '../models/MenuItem.js';
import Newsletter from '../models/Newsletter.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Testimonial from '../models/Testimonial.js';
import User from '../models/User.js';
import Video from '../models/Video.js';
import authRoutes from './authRoutes.js';
import { buildCrudRoutes } from './crudRoutes.js';
import reservationRoutes from './reservationRoutes.js';
import uploadRoutes from './uploadRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/cats', buildCrudRoutes(Cat, ['name', 'breed', 'personality']));
router.use('/menu', buildCrudRoutes(MenuItem, ['name', 'category', 'description']));
router.use('/products', buildCrudRoutes(Product, ['name', 'category', 'description']));
router.use('/blog', buildCrudRoutes(Blog, ['title', 'category', 'content']));
router.use('/gallery', buildCrudRoutes(Gallery, ['title', 'category', 'caption']));
router.use('/videos', buildCrudRoutes(Video, ['title', 'category']));
router.use('/events', buildCrudRoutes(Event, ['title', 'category', 'description']));
router.use('/testimonials', buildCrudRoutes(Testimonial, ['name', 'quote']));
router.use('/orders', buildCrudRoutes(Order, ['customer.name', 'customer.email'], { publicWrite: true }));
router.use('/contact', buildCrudRoutes(ContactMessage, ['name', 'email', 'message'], { publicWrite: true }));
router.use('/newsletter', buildCrudRoutes(Newsletter, ['email'], { publicWrite: true }));
router.use('/reservations', reservationRoutes);
router.use('/uploads', uploadRoutes);
router.use('/users', buildCrudRoutes(User, ['name', 'email']));

export default router;
