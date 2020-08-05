'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupMembers = sequelize.define('GroupMembers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type:DataTypes.INTEGER,
      foreignKey: true,
      allowNull: false
    },
    groupId: {
      type:DataTypes.INTEGER,
      foreignKey: true,
      allowNull: false
    },
    role: DataTypes.STRING
  }, {});
  GroupMembers.associate = function(models) {
    // associations can be defined here
    
  };
  return GroupMembers;
};