/**
 * Created by susnhine on 2016/11/14.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define("Company", {
        name: DataTypes.STRING,
        code: DataTypes.STRING,
        createUserId: DataTypes.INTEGER,
        modifyUserId: DataTypes.INTEGER
    })
}