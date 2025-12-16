import express from 'express';
import decrypt from './middleware/decrypt.middleware.js';
import encrypt from './middleware/encrypt.middleware.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();
app.use(express.json());
app.use(decrypt);
console.log('decrypt',decrypt)
app.use('/admin', adminRoutes);


app.use(encrypt);
export default app;


