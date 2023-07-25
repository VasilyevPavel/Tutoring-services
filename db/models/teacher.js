const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Teacher = sequelize.define('Teacher', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Teacher.associate = (models) => {
    Teacher.belongsToMany(models.Student, {
      through: models.TeacherStudent,
      foreignKey: 'teacherId',
      otherKey: 'studentId',
    });
  };

  return Teacher;
};
