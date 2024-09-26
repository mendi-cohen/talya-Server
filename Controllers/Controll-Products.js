import ProductService from '../Models/Services/Service-Products.js';
import { upload } from '../Config/multer.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProductController {
  async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'שגיאה בשליפת המוצרים' });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await ProductService.getProductById(req.params.id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'מוצר לא נמצא' });
      }
    } catch (error) {
      res.status(500).json({ error: 'שגיאה בשליפת המוצר' });
    }
  }
  

  async createProduct(req, res) {
    upload.single('image')(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ error: 'שגיאה בהעלאת הקובץ' });
      }
      try {
        const { name, price, description ,category } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
        const product = await ProductService.createProduct({
          name,
          price,
          description,
          image: imagePath,
          category: category
        });
        res.status(201).json(product);
      } catch (error) {
        res.status(500).json({ error: 'שגיאה ביצירת המוצר' });
      }
    });
  }

  async updateProduct(req, res) {
    upload.single('image')(req, res, async function (err) {
      if (err) {
        console.error('שגיאה בהעלאת הקובץ:', err); // הדפסת שגיאה
        return res.status(500).json({ error: 'שגיאה בהעלאת הקובץ' });
      }
      try {
        const { name, price, description, category } = req.body;
        console.log('נתונים לעדכון:', { name, price, description, category }); // הדפסת הנתונים
        const updateData = { name, price, description, category };
        if (req.file) {
          updateData.image = `/uploads/${req.file.filename}`;
        }
        const product = await ProductService.updateProduct(req.params.id, updateData);
        console.log('המוצר לאחר העדכון:', product); // הדפסת המוצר המעודכן
        res.json(product);
      } catch (error) {
        console.error('שגיאה בעדכון המוצר:', error); // הדפסת שגיאה
        res.status(500).json({ error: 'שגיאה בעדכון המוצר' });
      }
    });
  }
  



  async deleteProduct(req, res) {
    try {
      const product = await ProductService.getProductById(req.params.id);
      if (product && product.image) {
        const imagePath = path.join(__dirname, '..', product.image);
        
        // מחיקת התמונה ממערכת הקבצים
        await new Promise((resolve, reject) => {
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error('שגיאה במחיקת התמונה:', err);
              return reject(err);
            }
            resolve();
          });
        });
      }
      
      // מחיקת המוצר מהמאגר
      await ProductService.deleteProduct(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('שגיאה במחיקת המוצר:', error);
      res.status(500).json({ error: 'שגיאה במחיקת המוצר' });
    }
  }
  

  async getProductImage(req, res) {
    try {
      const product = await ProductService.getProductById(req.params.id);
      if (product && product.image) {
        res.sendFile(path.join(__dirname, '..', product.image));
      } else {
        res.status(404).send('תמונה לא נמצאה');
      }
    } catch (error) {
      res.status(500).send('שגיאת שרת');
    }
  }
}

export default new ProductController();