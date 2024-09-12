import express from 'express';
const router = express.Router();
import C_Product from '../Controllers/Controll-Products.js';

// שליפת כל המוצרים
router.get('/get_products',C_Product.GetAllProducts);
// הוספת מוצר חדש
router.post('/add_product',C_Product.Add_Product);
// עדכון מוצר קיים לפי מזהה
router.put('/products/:id',C_Product.UpdateProduct);
// מחיקת מוצר לפי מזהה
router.delete('/products/:id',C_Product.DeleteProduct);


export default router;