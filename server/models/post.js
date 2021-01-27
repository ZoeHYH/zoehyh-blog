'use strict';
const { Model } = require('sequelize');
const category = require('./category');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.Category);
    }
  }
  Post.init(
    {
      image: { type: DataTypes.STRING, validate: { isUrl: true } },
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
      deletedAt: DataTypes.DATE,
      CategoryId: { type: DataTypes.INTEGER, validate: { isInt: true } }
    },
    {
      sequelize,
      modelName: 'Post',
      timestamps: true,
      paranoid: true,
    }
  );
  return Post;
};
