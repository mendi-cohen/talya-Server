import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());





// Port
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`running on port ${port}`);
});