module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('class', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    teacherName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    auxiliarTeacherName: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    timestamps: false
  });
  return Class;
};
