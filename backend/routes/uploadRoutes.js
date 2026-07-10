import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { uploadFiles } from '../controllers/uploadController.js';
import { adminOnly, protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

router.post('/', protect, adminOnly, upload.array('files', 8), uploadFiles);
router.delete('/:type/:filename', protect, adminOnly, (req, res, next) => {
  try {
    const type = req.params.type === 'videos' ? 'videos' : 'images';
    const file = path.join(root, 'uploads', type, path.basename(req.params.filename));
    if (fs.existsSync(file)) fs.unlinkSync(file);
    res.json({ message: 'File deleted.' });
  } catch (error) {
    next(error);
  }
});

export default router;
