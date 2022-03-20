module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    orderDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    payed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, {
    timestamps: false
  });
  return Order;
};
