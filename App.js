import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Products from './Routers/Router-Products.js';
import Ping from './Routers/Router-Ping.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/',Ping)
app.use('/products', Products);

// Port
const port = process.env.PORT || 3000;
app.listen(port, () => {  
  console.log(`Server running on port ${port}`);
});
