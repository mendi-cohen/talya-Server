import Product from '../DataBase/Data-Products.js';

class ProductService {
  async getAllProducts() {
    return await Product.findAll();
  }

  async getProductById(id) {
    return await Product.findByPk(id);
  }

  async createProduct(productData) {
    return await Product.create(productData);
  }

  async updateProduct(id, productData) {
    const [updated] = await Product.update(productData, {
      where: { id }
    });
    if (updated) {
      return await Product.findByPk(id);
    }
    throw new Error('מוצר לא נמצא');
  }

  async deleteProduct(id) {
    const deleted = await Product.destroy({
      where: { id }
    });
    if (!deleted) {
      throw new Error('מוצר לא נמצא');
    }
  }
}

export default new ProductService();