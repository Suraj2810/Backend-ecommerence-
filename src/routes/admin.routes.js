import express from 'express';
import auth from '../middleware/auth.middleware.js';
import admin from '../middleware/admin.middleware.js';
import { login } from '../controllers/admin/auth.controller.js';

const router = express.Router();

router.post('/login', login);

export default router;
