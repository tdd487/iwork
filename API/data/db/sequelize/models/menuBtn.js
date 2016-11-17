module.exports = function (sequelize, DataTypes) {
  const MenuBtn = sequelize.define('MenuBtn', {
  }, {
    associate: function (models) {
      MenuBtn.hasMany(models.RoleMenuBtn, {as: 'roleMenuBtns', foreignKey: 'menuBtnId'})
      MenuBtn.belongsTo(models.Btn, {as: 'btn', foreignKey: 'btnId'})
    }
  });
  return MenuBtn;
}