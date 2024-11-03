import express from "express";
import productRoutes from "./Routers/Router-Products.js";
import OrdersRoutes from "./Routers/Router-Orders.js";
import OrdersService from './Models/Services/Srvice-Orders.js';
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cron from 'node-cron';
import TelegramBot from 'node-telegram-bot-api';
import fetch from 'node-fetch';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// הגדרות הבוט טלגרם
const BOT_TOKEN = process.env.BOT_TOKEN; 
const CHAT_ID = process.env.CHAT_ID;     
const SERVER_URL = process.env.SERVER_URL; 

// יצירת הבוט
const bot = new TelegramBot(BOT_TOKEN, { polling: true });


async function keepAlive() {
    try {
        const response = await fetch(SERVER_URL);
        if (response.ok) {
          await bot.sendMessage(CHAT_ID, '🟢 השרת פעיל ומגיב!');
        } else {
          await bot.sendMessage(CHAT_ID, `🔴 השרת מגיב אבל עם שגיאה: ${response.status}`);
        }
    } catch (error) {
        console.error('Server check failed:', error);
        await bot.sendMessage(CHAT_ID, `⚠️ אזהרה: בעיה בשרת\n${error.message}`);
    }
}

// פקודות בוט
bot.onText(/\/status/, async (msg) => {
    try {
        const response = await fetch(SERVER_URL);
        if (response.ok) {
            await bot.sendMessage(msg.chat.id, '🟢 השרת פעיל ומגיב!');
        } else {
            await bot.sendMessage(msg.chat.id, `🔴 השרת מגיב אבל עם שגיאה: ${response.status}`);
        }
    } catch (error) {
        await bot.sendMessage(msg.chat.id, `🔴 השרת לא מגיב: ${error.message}`);
    }
});





const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/products", productRoutes);
app.use("/orders", OrdersRoutes);
app.get('/status', (req, res) => {
  res.status(200).send('Server is running');
});

// משימה מתוזמנת למחיקת הזמנות ישנות
cron.schedule('0 0 * * *', async () => {
    try {
        const deletedCount = await OrdersService.deleteOldOrders();
        console.log(`נמחקו ${deletedCount} הזמנות ישנות`);
        await bot.sendMessage(CHAT_ID, `🗑️ נמחקו ${deletedCount} הזמנות ישנות`);
    } catch (error) {
        console.error('שגיאה בניקוי הזמנות ישנות:', error);
        await bot.sendMessage(CHAT_ID, `❌ שגיאה בניקוי הזמנות ישנות: ${error.message}`);
    }
});

// משימה מתוזמנת לשמירת השרת ער
cron.schedule('*/5 * * * *', keepAlive); // בדיקה כל 5 דקות

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`השרת פועל על פורט ${port}`);
    // הודעה בהפעלת השרת
    bot.sendMessage(CHAT_ID, `🚀 השרת עלה לאוויר על פורט ${port}!`)
        .catch(console.error);
});

export default app;