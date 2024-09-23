import express from 'express';
import OrdersController from '../Controllers/Cotroll-Orders.js';

const router = express.Router();

router.get('/getAllOrders', OrdersController.getAllOrders);
router.get('/:id', OrdersController.getOrderById);
router.post('/addNewOrder', OrdersController.createOrder);
router.delete('/:id', OrdersController.deleteOrder);


export default router;