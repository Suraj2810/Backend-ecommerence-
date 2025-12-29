import express from 'express';
import auth from '../middleware/auth.middleware.js';
import admin from '../middleware/admin.middleware.js';
import { login } from '../controllers/admin/auth.controller.js';
import {verifyOtp}from'../controllers/admin/auth.controller.js';
import { addProduct } from '../controllers/admin/product.controller.js';
import{productList} from '../controllers/admin/product.controller.js';
import{deleteProduct} from'../controllers/admin/product.controller.js'
import {decryptMiddleware} from '../middleware/aes.middleware.js';
import {encryptMiddleware} from '../middleware/aes.middleware.js';
import {updateProduct} from '../controllers/admin/product.controller.js';
import{updateStatusProduct} from'../controllers/admin/product.controller.js'
import { userDelete, userList, userStatus } from '../controllers/admin/user.controller.js';
import { addCategory, deleteCategory, listCategory, statusCategory, subCategory, updateCategory } from '../controllers/admin/category.controller.js';
import upload from '../middleware/upload.middleware.js';


const router = express.Router();
// router.use(encryptMiddleware);
/**
 * @swagger
 * /swagger-test:
 *   get:
 *     summary: Swagger test API
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: Swagger is working
 */
router.get("/swagger-test", (req, res) => {
  res.json({ message: "Swagger working!" });
});
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Admin login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login',decryptMiddleware, login);
router.post('/verifyOtp',decryptMiddleware,verifyOtp);

// Users API
router.get('/userList',auth,userList);
router.put('/userStatus/:id',auth,userStatus);
router.delete('/userDelete/:id',auth,userDelete);

// category API

router.post('/category/addCategory',auth,addCategory);
router.put('/category/updateCategory/:id',auth,updateCategory);
router.get('/category/listCategory',auth,listCategory);
router.delete('/category/deleteCategory/:id',auth,deleteCategory);
router.put('/category/updateStatus/:id',auth,statusCategory);
router.get('/category/subCategory/:id',auth,subCategory)

router.post('/addProduct',auth,upload.array("images",5),addProduct);
router.get('/productList',auth,productList);
router.delete('/productDelete/:id', auth, decryptMiddleware, deleteProduct);
router.put('/productUpdate/:id',auth,decryptMiddleware,updateProduct);
router.put('/ProductUpdateStatus/:id',auth,decryptMiddleware,updateStatusProduct)

export default router;
