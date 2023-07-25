const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  const Subject = sequelize.define('Subject', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Subject;
};
