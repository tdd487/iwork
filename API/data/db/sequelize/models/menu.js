module.exports = function (sequelize, DataTypes) {
  const Menu = sequelize.define('Menu', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    type: DataTypes.INTEGER,
    sort: DataTypes.INTEGER,
    createUserId: DataTypes.INTEGER,
    modifyUserId: DataTypes.INTEGER
  }, {
    associate: function (models) {
      Menu.hasMany(models.Menu, {as: 'children', foreignKey: 'parentId'});
      Menu.belongsTo(models.Menu, {as: 'parent', foreignKey: 'parentId'});
      Menu.hasMany(models.MenuBtn, {as: 'menuBtns', foreignKey: 'menuId'});
    }
  });
  return Menu;
}