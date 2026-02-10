export function adminAuth(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const [type, token] = header.split(' ');
  if (type !== 'Bearer' || token !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({ message: 'Invalid admin token' });
  }

  next();
}
