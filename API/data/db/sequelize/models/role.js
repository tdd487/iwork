module.exports = function (sequelize, DataTypes) {
  const Role = sequelize.define('Role', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    createUserId: DataTypes.INTEGER,
    modifyUserId: DataTypes.INTEGER
  }, {
    associate: function (models) {
      Role.hasMany(models.RoleMenuBtn, {as: 'roleMenuBtns', foreignKey: 'roleId'});
      Role.hasMany(models.UserRole, {as: 'userRoles', foreignKey: 'roleId'});
    }
  });
  return Role;
}