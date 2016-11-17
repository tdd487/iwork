module.exports = function (sequelize, DataTypes) {
  const Btn = sequelize.define('Btn', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    sort: DataTypes.INTEGER,
    createUserId: DataTypes.INTEGER,
    modifyUserId: DataTypes.INTEGER
  }, {
    associate: function (models) {
      Btn.hasMany(models.MenuBtn, {as: 'menuBtns', foreignKey: 'btnId'});
    }
  });
  return Btn;
}