const dangerous = /<script[\s\S]*?>[\s\S]*?<\/script>|javascript:|on\w+=/gi;

function clean(value) {
  if (typeof value === 'string') return value.replace(dangerous, '').trim();
  if (Array.isArray(value)) return value.map(clean);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, nested]) => [key, clean(nested)]));
  }
  return value;
}

export function sanitizeInput(req, _res, next) {
  if (req.body) req.body = clean(req.body);
  if (req.params) req.params = clean(req.params);
  next();
}
