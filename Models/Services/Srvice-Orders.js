import Order from '../DataBase/Data-Orders.js';

class OrdersService {
  async getAllOrders() {
    return await Order.findAll();
  }

  async getOrderById(id) {
    return await Order.findByPk(id);
  }

  async createOrder(orderData) {
    return await Order.create(orderData);
  }

  async updateOrder(id, orderData) {
    const [updated] = await Order.update(orderData, {
      where: { id }
    });
    if (updated) {
      return await Order.findByPk(id);
    }
    throw new Error('מוצר לא נמצא');
  }

  async deleteOrder(id) {
    const deleted = await Order.destroy({
      where: { id }
    });
    if (!deleted) {
      throw new Error('מוצר לא נמצא');
    }
  }
}

export default new OrdersService();