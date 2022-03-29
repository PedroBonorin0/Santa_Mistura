const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models/');

require('dotenv').config();

const productRoutes = require('./routes/productRouter');
const clientRoutes = require('./routes/clientRouter');
const orderRoutes = require('./routes/orderRouter');
const classRoutes = require('./routes/classRouter');
const userRoutes = require('./routes/userRouter');

var corsOptions = {
  origin: 'http://localhost:8080'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();
// db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });

app.get('/api/', (req, res) => {
  res.send('Home');
});

app.use(productRoutes);
app.use(clientRoutes);
app.use(orderRoutes);
app.use(classRoutes);
app.use(userRoutes);

app.listen(process.env.PORT || 3031, () => {
  console.log();
  console.log(`Running on http://localhost:${process.env.PORT || 3031}`);
  console.log();
});

