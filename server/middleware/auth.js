import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../mongoose/models/User.js';

// JWT_SECRET should be set as an environment variable (Render → Environment).
// If it is missing we generate a random one so the server still starts safely;
// the only downside is that everyone gets logged out whenever the server restarts.
let JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  JWT_SECRET = crypto.randomBytes(48).toString('hex');
  console.warn('⚠️  JWT_SECRET is not set. Using a temporary random secret (logins reset on restart).');
}

const TOKEN_TTL = '7d';

export function signToken(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role }, JWT_SECRET, { expiresIn: TOKEN_TTL });
}

// Reads "Authorization: Bearer <token>", verifies it and loads the user into req.user.
export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Please log in first.' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ message: 'Account no longer exists.' });
    if (user.status === 'inactive') return res.status(403).json({ message: 'This account is inactive.' });
    req.user = user;
    return next();
  } catch {
    return res.status(401).json({ message: 'Session expired. Please log in again.' });
  }
}

// Use after requireAuth: only lets the listed roles through.
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Only ${roles.join(' / ')} can do this.` });
    }
    return next();
  };
}
