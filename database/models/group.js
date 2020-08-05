'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    groupName: DataTypes.STRING,
    groupDescription: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true
    }
  }, {});
  Group.associate = function(models) {
    // associations can be defined here

  //   Group.belongsTo(models.User, {
  //     foreignKey: 'userId',
  //     as: 'author',
  //     onDelete: 'CASCADE',
  //   })
  };
  return Group;
};