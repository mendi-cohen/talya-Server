import multer from 'multer';
import Products_M from "../Models/options/Options-Products.js";


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

class ProductsControll {
  // הוספת מוצר
  async Add_Product(req, res) {
    upload.single('image')(req, res, async function (err) {
      if (err) {
        console.error("Error during file upload:", err.message);
        return res.status(500).json({ error: err.message });
      }

      const { name, price, description } = req.body;
      const imageBuffer = req.file ? req.file.buffer : null;
      const imageType = req.file ? req.file.mimetype : null;

      try {
        const product = await Products_M.save({
          name,
          price,
          description,
          image: imageBuffer,
          imageType: imageType
        });
        res.status(201).json({
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          imageType: product.imageType
        });
      } catch (error) {
        console.error("Error inserting product:", error.message);
        res.status(500).json({ error: 'Error inserting product' });
      }
    });
  }

  // הצגת כל המוצרים
  async GetAllProducts(req, res) {
    try {
      const products = await Products_M.getProducts({
        attributes: ['id', 'name', 'price', 'description', 'imageType']
      });
      
      const productsWithImageUrl = products.map(product => ({
        ...product.toJSON(),
        imageUrl: `/product-image/${product.id}`
      }));
      
      res.status(200).json(productsWithImageUrl);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Error fetching products' });
    }
  }

  // שליפת תמונה של מוצר ספציפי
  async GetProductImage(req, res) {
    try {
      const { id } = req.params;
      const product = await Products_M.findByPk(id, {
        attributes: ['image', 'imageType']
      });
      
      if (product && product.image) {
        res.contentType(product.imageType);
        res.send(product.image);
      } else {
        res.status(404).send('Image not found');
      }
    } catch (error) {
      console.error('Error fetching product image:', error);
      res.status(500).send('Server error');
    }
  }

  // עדכון מוצר
  async UpdateProduct(req, res) {
    const { id } = req.params;
    
    upload.single('image')(req, res, async function (err) {
      if (err) {
        console.error("Error during file upload:", err.message);
        return res.status(500).json({ error: err.message });
      }

      const { name, price, description } = req.body;
      const updateData = { name, price, description };

      if (req.file) {
        updateData.image = req.file.buffer;
        updateData.imageType = req.file.mimetype;
      }

      try {
        const [updated] = await Products_M.update(updateData, {
          where: { id }
        });

        if (updated) {
          const updatedProduct = await Products_M.findByPk(id, {
            attributes: ['id', 'name', 'price', 'description', 'imageType']
          });
          res.status(200).json(updatedProduct);
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error updating product' });
      }
    });
  }

  // מחיקת מוצר
  async DeleteProduct(req, res) {
    const { id } = req.params;

    try {
      const deleted = await Products_M.destroy({
        where: { id }
      });

      if (deleted) {
        res.status(200).json({ message: 'Product deleted successfully' });
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error deleting product' });
    }
  }
}

export default new ProductsControll();