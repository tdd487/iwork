module.exports = function (sequelize, DataTypes) {
    const Kht = sequelize.define('Kht', {
        code: DataTypes.STRING,
        name: DataTypes.STRING,
        status: DataTypes.INTEGER,
        sort: DataTypes.INTEGER,
        isend: DataTypes.INTEGER,
        remark: DataTypes.STRING,
        companyId: DataTypes.INTEGER,
        createUserId: DataTypes.INTEGER,
        modifyUserId: DataTypes.INTEGER
    }, {
        associate: function (models) {
            Kht.hasMany(models.Kht, {as: 'children', foreignKey: 'parentId'});
            Kht.belongsTo(models.Kht, {as: 'parent', foreignKey: 'parentId'});
            Kht.hasMany(models.Kh, {as: 'khs', foreignKey: 'khtId'});
        }
    });
    return Kht;
}