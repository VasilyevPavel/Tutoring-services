const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Student = sequelize.define('Student', {
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

  Student.associate = (models) => {
    Student.belongsToMany(models.Teacher, {
      through: models.TeacherStudent,
      foreignKey: 'studentId',
      otherKey: 'teacherId',
    });
  };

  return Student;
};
