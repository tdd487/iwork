module.exports = function (sequelize, DataTypes) {
  const Let = sequelize.define('Let', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    status:DataTypes.INTEGER,
    remark:DataTypes.STRING,
    isEnd: DataTypes.INTEGER,
    companyId: DataTypes.INTEGER,
    createUserId: DataTypes.INTEGER,
    modifyUserId: DataTypes.INTEGER
  }, {
    associate: function (models) {
      Let.hasMany(models.Let, {as: 'children', foreignKey: 'parentId'});
      Let.belongsTo(models.Let, {as: 'parent', foreignKey: 'parentId'});
      Let.hasMany(models.Le, {as: 'les', foreignKey: 'letId'})
    }
  });
  return Let;
}