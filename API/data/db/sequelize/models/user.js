module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    tel: DataTypes.STRING,
    disable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
    createUserId: DataTypes.INTEGER,
    modifyUserId: DataTypes.INTEGER
  }, {
      associate: function (models) {
        User.hasMany(models.UserRole, {as: 'userRoles', foreignKey: 'userId'});
      }
    });
  return User;
}