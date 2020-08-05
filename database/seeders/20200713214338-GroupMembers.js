module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'GroupMembers',
    [
      {
        userId: 1,
        groupId: 1,
        role:'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        groupId: 2,
        role:'Normal user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('GroupMembers', null, {}),
};