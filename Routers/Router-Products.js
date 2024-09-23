import express from 'express';
import ProductController from '../Controllers/Controll-Products.js';

const router = express.Router();

router.get('/getAll', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.post('/addOne', ProductController.createProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
router.get('/:id/image', ProductController.getProductImage);

export default router;