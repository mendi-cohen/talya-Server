import OrdersService from '../Models/Services/Srvice-Orders.js';





class OredrsController {
  async getAllOrders(req, res) {
    try {
      const Orders = await OrdersService.getAllOrders();
      res.json({"Orders:" : Orders});
    } catch (error) {
      res.status(500).json({ error: 'שגיאה בשליפת המוצרים' });
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
    const { name, email, address, phone, items, totalPrice } = req.body;

    try {
        const order = await OrdersService.createOrder({
            name,
            email,
            address,
            phone,
            items,
            totalPrice,
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
}

export default new OredrsController();