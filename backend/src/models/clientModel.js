module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('client', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isStudent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      default: '-'
    },
    parentName: {
      type: DataTypes.STRING,
      default: '-'
    },
    parentPhone: {
      type: DataTypes.STRING,
      default: '-'
    },
    balance: {
      type: DataTypes.DECIMAL(5, 2),
      default: 0
    },
  }, {
    timestamps: false
  });
  return Client;
};
