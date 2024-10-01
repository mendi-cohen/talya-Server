import Order from '../DataBase/Data-Orders.js';
import { Op } from 'sequelize';

class OrdersService {
  async getAllNewOrders() {
    return await Order.findAll({
      where: { completed: false } 
    });
}
  async getAllComletedOrders() {
    return await Order.findAll({
      where: { completed: true } 
    });
}

async deleteOldOrders() {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  
  try {
    const result = await Order.destroy({
      where: {
        createdAt: {
          [Op.lt]: oneYearAgo
        }
      }
    });
    return result;
  } catch (error) {
    console.error('Error deleting old orders:', error);
    throw error;
  }
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

  async updateOrderStatus(id, completed) {
    const [updated] = await Order.update({ completed }, {
      where: { id }
    });
    if (updated) {
      return await Order.findByPk(id);
    }
    throw new Error('ההזמנה לא נמצאה');
  }
}

export default new OrdersService();