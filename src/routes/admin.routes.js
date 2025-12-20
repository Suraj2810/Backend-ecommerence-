import express from 'express';
import auth from '../middleware/auth.middleware.js';
import admin from '../middleware/admin.middleware.js';
import { login } from '../controllers/admin/auth.controller.js';
import {verifyOtp}from'../controllers/admin/auth.controller.js';
import { addProduct } from '../controllers/admin/product.controller.js';
import{productList} from '../controllers/admin/product.controller.js';
import{deleteProduct} from'../controllers/admin/product.controller.js'
import {decryptMiddleware} from '../middleware/aes.middleware.js';
import {encryptMiddleware} from '../middleware/aes.middleware.js'


const router = express.Router();
router.use(encryptMiddleware);
router.post('/login',decryptMiddleware, login);
router.post('/verifyOtp',decryptMiddleware,verifyOtp);

router.post('/addProduct',auth,decryptMiddleware,addProduct);
router.get('/productList',auth,productList);
router.delete('/productDelete/:id', auth, decryptMiddleware, deleteProduct);

export default router;
