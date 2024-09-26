import express from 'express';
import OrdersController from '../Controllers/Cotroll-Orders.js';

const router = express.Router();

router.get('/getAllNewOrders', OrdersController.getAllNewOrders);
router.get('/getAllComletedOrders', OrdersController.getAllComletedOrders);
router.get('/:id', OrdersController.getOrderById);
router.post('/addNewOrder', OrdersController.createOrder);
router.delete('/:id', OrdersController.deleteOrder);
router.put('/updateOrderStatus', OrdersController.updateOrderStatus);


export default router;