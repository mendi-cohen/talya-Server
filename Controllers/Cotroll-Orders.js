import OrdersService from '../Models/Services/Srvice-Orders.js';

class OredrsController {
  async getAllNewOrders(req, res) {
    try {
      const Orders = await OrdersService.getAllNewOrders();
      res.json({ Orders: Orders });
    } catch (error) {
      res.status(500).json({ error: 'שגיאה בשליפת ההזמנות' });
    }
  }
  
  async getAllComletedOrders(req, res) {
    try {
      const Orders = await OrdersService.getAllComletedOrders();
      res.json({ Orders: Orders });
    } catch (error) {
      res.status(500).json({ error: 'שגיאה בשליפת ההזמנות' });
    }
  }

  async getOrderById(req, res) {
    try {
      const Order = await OrdersService.getOrderById(req.params.id);
      if (Order) {
        res.json(Order);
      } else {
        res.status(404).json({ error: 'מוצר לא נמצא' });
      }
    } catch (error) {
      res.status(500).json({ error: 'שגיאה בשליפת המוצר' });
    }
  }
  

  async createOrder(req, res) {
    const { name, email, address, phone, items, totalPrice ,completed } = req.body;

    try {
        const order = await OrdersService.createOrder({
            name,
            email,
            address,
            phone,
            items,
            totalPrice,
            completed
        });
        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error); 
        res.status(500).json({ error: 'שגיאה ביצירת ההזמנה', details: error });
    }
}

  

  async deleteOrder(req, res) {
    try {
      await OrdersService.deleteOrder(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'שגיאה במחיקת המוצר' });
    }
  }


  async updateOrderStatus(req, res) {
    const { id, completed } = req.body; 
  
    try {
      
      const updatedOrder = await OrdersService.updateOrderStatus(id, completed);
      
      if (updatedOrder) {
        res.json({ message: 'ההזמנה עודכנה בהצלחה', order: updatedOrder });
      } else {
        res.status(404).json({ error: 'ההזמנה לא נמצאה' });
      }
    } catch (error) {
      console.error('שגיאה בעדכון ההזמנה:', error);
      res.status(500).json({ error: 'שגיאה בעדכון ההזמנה' });
    }
  }
  
}

export default new OredrsController();