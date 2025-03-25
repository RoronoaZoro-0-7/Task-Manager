import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js';
import router from './routes/taskRoutes.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(process.env.PORT, () => {
    console.log('connected to server',process.env.PORT);
});