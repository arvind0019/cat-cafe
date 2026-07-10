import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import apiRoutes from './routes/index.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { sanitizeInput } from './middleware/sanitize.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: false }));
app.use(cors({ origin: process.env.CLIENT_URL || true, credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(sanitizeInput);
app.use(morgan('dev'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', apiRoutes);
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get('/health', (_req, res) => res.json({ status: 'ok', database: 'catcafe' }));
app.get('*', (_req, res) => res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html')));

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
connectDB()
  .then(() => app.listen(port, () => console.log(`Luxury Cat Cafe running at http://127.0.0.1:${port}`)))
  .catch((error) => {
    console.error('MongoDB connection failed. Start MongoDB Community Server locally first.');
    console.error(error.message);
    process.exit(1);
  });
