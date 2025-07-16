const express = require('express');
const sequelize = require('./config/database'); // فایل دیتابیس را فراخوانی می‌کنیم

const app = express();
const PORT = 5001; // استفاده از پورت جدید

// تست اتصال به دیتابیس
async function testDbConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully. ✅');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testDbConnection(); // <--- این خط تابع را فراخوانی می‌کند

app.get('/', (req, res) => {
  res.send('Hello from Majaleh360 Backend! 👋');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});