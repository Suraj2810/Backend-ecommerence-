import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const generateToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10d' });

export const hashPassword = (password) =>
  bcrypt.hash(password, 10);
