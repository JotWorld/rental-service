import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import router from './routes/index.js';  

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/', router);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✔ Подключились к БД');



    app.listen(PORT, () => console.log(`🚀 Сервер запущен на порту ${PORT}`));
  } catch (e) {
    console.error('❌ Ошибка старта:', e);
  }
};

start();
