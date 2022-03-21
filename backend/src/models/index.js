const dbConfig = require('../config/db');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require('./productModel')(sequelize, Sequelize);
db.clients = require('./clientModel')(sequelize, Sequelize);
db.orders = require('./orderModel')(sequelize, Sequelize);
db.classes = require('./classModel')(sequelize, Sequelize);
db.users = require('./userModel')(sequelize, Sequelize);

// ------------------------RELATIONS------------------------

// Client - Order
db.orders.belongsTo(db.clients);
db.clients.hasMany(db.orders);

// Order - Products
db.orders.belongsToMany(db.products, { through: 'orderProducts' });
db.products.belongsToMany(db.orders, { through: 'orderProducts' });

// Client - Class
db.clients.belongsTo(db.classes);
db.classes.hasMany(db.clients);

module.exports = db;
