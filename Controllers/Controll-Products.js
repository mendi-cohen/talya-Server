import multer from 'multer';
import path from 'path';
import Products_M from "../Models/options/Options-Products.js";

// הגדרת Multer לשמירה על תמונות
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
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
      const imageUrl = req.file ? `${process.env.FOOL_URL}/uploads/${req.file.filename}` : null;

      try {
        const product = await Products_M.save({ 
          name,
          price,
          description,
          image: imageUrl
        });
        res.status(201).json(product);
      } catch (error) {
        console.error("Error inserting product:", error.message);
        res.status(500).json({ error: 'Error inserting product' });
      }
    });
  }

  // הצגת כל המוצרים
  async GetAllProducts(req, res) {
    try {
      const products = await Products_M.getProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products' });
    }
  }

  // עידכון מוצר
  async UpdateProduct(req, res) {
    const { id } = req.params;
    const { name, price, description, image } = req.body;

    try {
      const [updated] = await Products_M.update({ 
        name, 
        price, 
        description, 
        image 
      }, {
        where: { id }
      });

      if (updated) {
        const updatedProduct = await Products_M.findByPk(id);
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating product' });
    }
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
