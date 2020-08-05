module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Groups',
    [
      {
        groupName: 'Domus Pacis',
        groupDescription: 'This is a group that bring together all people who have been live at Domus Pacis hostel',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        groupName: 'Jon Fam',
        groupDescription: 'This is a group where family members of Jon',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Groups', null, {}),
};