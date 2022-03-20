const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models/');

const productRoutes = require('./routes/productRouter');
const clientRoutes = require('./routes/clientRouter');
const orderRoutes = require('./routes/orderRouter');

var corsOptions = {
  origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();

app.get('/', (req, res) => {
  res.send('Home');
});

app.use(productRoutes);
app.use(clientRoutes);
app.use(orderRoutes);

app.listen(3031, () => {
  console.log();
  console.log('Running on http://localhost:3031');
  console.log();
});

