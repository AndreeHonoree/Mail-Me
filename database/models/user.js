
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    }, 
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type:DataTypes.STRING
    }
  }, {});
  // User.associate = function(models) {
  //   // associations can be defined here
  //   User.hasMany(models.Article, {
  //     foreignKey: 'userId',
  //     as: 'articles',
  //     onDelete: 'CASCADE',
  //   });

  //   User.hasMany(models.Comment, {
  //     foreignKey: 'userId',
  //     as: 'comments',
  //     onDelete: 'CASCADE',
  //   });
  //  };

  //   User.hasMany(models.Group, {
  //     foreignKey: 'userId',
  //     as: 'groups',
  //     onDelete: 'CASCADE',
  //   });

  return User;
};