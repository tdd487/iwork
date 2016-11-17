module.exports = function (sequelize, DataTypes) {
  const RoleMenuBtn = sequelize.define('RoleMenuBtn', {
  }, {
    associate: function (models) {
      RoleMenuBtn.belongsTo(models.MenuBtn, {as: 'menuBtn', foreignKey: 'menuBtnId'});
      RoleMenuBtn.belongsTo(models.Role, {as: 'role', foreignKey: 'roleId'});
    }
  });
  return RoleMenuBtn;
}