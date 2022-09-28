const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../loaders/db');

const Categories = sequelize.define(
  'Categories',
  {
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    parentId: DataTypes.INTEGER,
    creatorId: DataTypes.INTEGER,
  },
  {
    paranoid: true,
    force: false,
  }
);

module.exports = Categories;
