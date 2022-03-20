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

// ------------------------RELATIONS------------------------

db.orders.belongsTo(db.clients);
db.clients.hasMany(db.orders);

db.orders.belongsToMany(db.products, { through: 'orderProducts' });
db.products.belongsToMany(db.orders, { through: 'orderProducts' });

module.exports = db;
