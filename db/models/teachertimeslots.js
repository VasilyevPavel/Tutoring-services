'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeacherTimeslots extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TeacherTimeslots.init({
    teacherId: DataTypes.INTEGER,
    timeslotId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TeacherTimeslots',
  });
  return TeacherTimeslots;
};