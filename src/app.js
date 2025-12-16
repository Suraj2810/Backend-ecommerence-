
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import decrypt from './middleware/decrypt.middleware.js';
import encrypt from './middleware/encrypt.middleware.js';
import adminRoutes from './routes/admin.routes.js';
import { dbConnect } from "./confiq/dbConnection.js";

const app = express();
app.use(express.json());
app.use(decrypt);
console.log('decrypt',decrypt)
app.use(encrypt);
app.use('/admin', adminRoutes);

const PORT =process.env.PORT

dbConnect().then(()=>{
    console.log('DB Connect Successfully');
  
  app.listen((PORT),()=>console.log(`Server Started ${PORT}`))
}).catch((err)=>
console.log(`Error Connected to Server${err}`))


