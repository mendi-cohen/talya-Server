import { db } from '../Config/DB.js';
import multer from 'multer';
import path from 'path';

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
  
      console.log("File upload completed:", req.file);
  
      const { name, price, description } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  
      try {
        const query = `INSERT INTO products (name, price, description, image_url) VALUES (?, ?, ?, ?)`;
        db.run(query, [name, price, description, imageUrl], function (err) {
          if (err) {
            console.error("Error inserting product:", err.message);
            return res.status(500).json({ error: err.message });
          }
          console.log("Product inserted successfully:", { id: this.lastID, name, price, description, imageUrl });
          res.status(201).json({ id: this.lastID, name, price, description, imageUrl });
        });
      } catch (error) {
        console.error("Error processing request:", error.message);
        res.status(500).json({ error: 'Error inserting product' });
      }
    });
  }
  
  // הצגת כל המוצרים

  async GetAllProducts(req, res) {
    try {
      const query = `SELECT * FROM products`;
      db.all(query, [], (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products' });
    }
  }

  // עידכון מוצר

  async UpdateProduct(req, res) {
    const { id } = req.params;
    const { name, price, description, image_url } = req.body;

    try {
      const query = `UPDATE products SET name = ?, price = ?, description = ?, image_url = ? WHERE id = ?`;
      db.run(query, [name, price, description, image_url, id], function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully' });
      });
    } catch (error) {
      res.status(500).json({ error: 'Error updating product' });
    }
  }

  // מחיקת מוצר 

  async DeleteProduct(req, res) {
    const { id } = req.params;

    try {
      const query = `DELETE FROM products WHERE id = ?`;
      db.run(query, id, function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
      });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting product' });
    }
  }
}

export default new ProductsControll();
