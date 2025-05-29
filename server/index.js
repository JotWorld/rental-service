import * as dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import router from './routes/index.js';  
import errorMiddleware from './error/errorMiddleware.js'

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use(errorMiddleware);
app.use(
  '/static',
  express.static(path.resolve(path.dirname(''), 'static'))
);

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
