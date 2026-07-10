export function uploadFiles(req, res) {
  const files = (req.files || []).map((file) => ({
    originalName: file.originalname,
    filename: file.filename,
    type: file.mimetype,
    size: file.size,
    url: `/uploads/${file.mimetype.startsWith('video/') ? 'videos' : 'images'}/${file.filename}`
  }));
  res.status(201).json(files);
}
