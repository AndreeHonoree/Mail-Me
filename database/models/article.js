module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: false,
    },
    
  }, {});
  // Article.associate = function(models) {
  //   // associations can be defined here
  //   Article.hasMany(models.Comment, {
  //     foreignKey: 'articleId',
  //     as: 'comments',
  //     onDelete: 'CASCADE',
  //   });

  //   Article.belongsTo(models.User, {
  //     foreignKey: 'userId',
  //     as: 'author',
  //     onDelete: 'CASCADE',
  //   })
  // };
  return Article;
};