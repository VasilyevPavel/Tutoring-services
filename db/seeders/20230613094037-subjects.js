/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Subjects', [{
      name: 'История',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Английский',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Математика',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Биология',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Теория плоскоземелья',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Subjects', null, {});
  },
};
