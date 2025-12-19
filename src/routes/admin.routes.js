import express from 'express';
import auth from '../middleware/auth.middleware.js';
import admin from '../middleware/admin.middleware.js';
import { login } from '../controllers/admin/auth.controller.js';
import {verifyOtp}from'../controllers/admin/auth.controller.js';
import { addproduct } from '../controllers/admin/product.controller.js';
import{productList} from '../controllers/admin/product.controller.js';
import{deleteProduct} from'../controllers/admin/product.controller.js'

const router = express.Router();

router.post('/login', login);
router.post('/verifyOtp',verifyOtp);

router.post('/addProduct',auth,addproduct);
router.get('/productList',auth,productList);
router.delete('/productDelete/:id',auth,deleteProduct)

export default router;
