import express from "express";
import productRoutes from "./Routers/Router-Products.js";
import OrdersRoutes from "./Routers/Router-Orders.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/products", productRoutes);
app.use("/orders", OrdersRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`השרת פועל על פורט ${port}`);
});

export default app;
