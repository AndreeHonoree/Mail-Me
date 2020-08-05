module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    articleId: {
      type:DataTypes.INTEGER,
      foreignKey: true,
      allowNull: false
    },
    comment: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: false
    }
  }, {});
  // Comment.associate = function(models) {
  //   // associations can be defined here
  //   Comment.belongsTo(models.User, {
  //     foreignKey: 'userId',
  //     as: 'owner'
  //   });
  //   Comment.belongsTo(models.Article, {
  //     foreignKey: 'articleId',
  //     as: 'article'
  //   });
  // };
  return Comment;
};