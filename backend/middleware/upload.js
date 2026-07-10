import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    const folder = file.mimetype.startsWith('video/') ? 'uploads/videos' : 'uploads/images';
    cb(null, folder);
  },
  filename: (_req, file, cb) => {
    const safe = file.originalname.toLowerCase().replace(/[^a-z0-9.]+/g, '-');
    cb(null, `${Date.now()}-${safe}`);
  }
});

export const upload = multer({
  storage,
  limits: { fileSize: 60 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif|mp4|webm|mov/;
    const ok = allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype);
    cb(ok ? null : new Error('Only image and video files are allowed.'), ok);
  }
});
