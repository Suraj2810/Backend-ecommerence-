
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import adminRoutes from './routes/admin.routes.js';
import { dbConnect } from "./config/dbConnection.js";

import { swaggerUi, swaggerSpec } from "./swagger.js";

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/uploads", express.static("uploads"));
app.use('/admin', adminRoutes);

const PORT =process.env.PORT

dbConnect().then(()=>{
    console.log('DB Connect Successfully');
  
  app.listen((PORT),()=>console.log(`Server Started ${PORT}`))
}).catch((err)=>
console.log(`Error Connected to Server${err}`))


