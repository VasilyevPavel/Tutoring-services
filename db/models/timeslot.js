const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Timeslot extends Model {
    static associate(models) {
      Timeslot.belongsTo(models.Teacher, {
        foreignKey: 'teacherId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Timeslot.belongsTo(models.Subject, {
        foreignKey: 'subjectId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Timeslot.belongsTo(models.Student, {
        foreignKey: 'studentId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Timeslot.init(
    {
      teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Teachers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Subjects',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Students',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      isBooked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Timeslot',
    },
  );

  return Timeslot;
};
