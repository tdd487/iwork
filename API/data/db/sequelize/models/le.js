module.exports = function (sequelize, DataTypes) {
  const Le = sequelize.define('Le', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    status:DataTypes.INTEGER,
    sizes:DataTypes.STRING,
    weightUpper:DataTypes.DECIMAL,
    weightLower:DataTypes.DECIMAL,
    remark:DataTypes.STRING,
    tel: DataTypes.STRING,
    createUserId: DataTypes.INTEGER,
    modifyUserId: DataTypes.INTEGER
  },{
    associate: function (models) {
      Le.belongsTo(models.Let, {as: 'let', foreignKey: 'letId'})
    }
  });
  return Le;
}