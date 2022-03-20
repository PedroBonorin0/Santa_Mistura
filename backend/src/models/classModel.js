module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('class', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    teacherName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });
  return Class;
};
