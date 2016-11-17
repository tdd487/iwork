/**
 * Created by susnhine on 2016/11/14.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define("Brand", {
        name: DataTypes.STRING,
        code: DataTypes.STRING,
        remark: DataTypes.STRING,
        status: DataTypes.STRING,
        companyId: DataTypes.INTEGER,
        createUserId: DataTypes.INTEGER,
        modifyUserId: DataTypes.INTEGER
    })
}