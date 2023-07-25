const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TeacherStudent extends Model {
    static associate(models) {
      // Define associations if any
    }
  }

  TeacherStudent.init(
    {
      teacherId: DataTypes.INTEGER,
      studentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'TeacherStudent',
    },
  );

  return TeacherStudent;
};
