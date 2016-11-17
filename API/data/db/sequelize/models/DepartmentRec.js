/**
 * Created by susnhine on 2016/11/15.
 */
module.exports = function (sequelize, DataTypes) {
    const  DepartmentRec = sequelize.define('DepartmentRec', {
        code: DataTypes.STRING,
        name: DataTypes.STRING,
        contacs: DataTypes.STRING,
        tel: DataTypes.STRING,
        fax: DataTypes.STRING,
        addr: DataTypes.STRING,
        remark: DataTypes.STRING,
        sort: DataTypes.INTEGER,
        createUserId: DataTypes.INTEGER,
        modifyUserId: DataTypes.INTEGER
    }, {
        associate: function (models) {
            DepartmentRec.hasMany(models.DepartmentRec, {as: 'children', foreignKey: 'parentId'});
            DepartmentRec.belongsTo(models.DepartmentRec, {as: 'parent', foreignKey: 'parentId'});
        }
    });
    return DepartmentRec;
}
