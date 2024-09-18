import Product from '../DataBase/Data-Products.js';

class Products{

  async getProducts(){
    const result = await Product.findAll();
    return result
  }


  async save(data) {
    try {
      const result = await Product.create(data);
      return result;
    } catch (error) {
      console.error(error.stack);
      return error;
    }
  }

}

export default new Products();