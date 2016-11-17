module.exports = function (sequelize, DataTypes) {
  const UserRole = sequelize.define('UserRole', {
  }, {
    associate: function (models) {
      UserRole.belongsTo(models.User, {as: 'user', foreignKey: 'userId'})
      UserRole.belongsTo(models.Role, {as: 'role', foreignKey: 'roleId'})
    }
  });
  return UserRole;
}