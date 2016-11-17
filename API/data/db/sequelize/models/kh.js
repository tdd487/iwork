module.exports = function (sequelize, DataTypes) {
    const Kh = sequelize.define('Kh', {
        code: DataTypes.STRING,
        name: DataTypes.STRING,
        fullname: DataTypes.STRING,
        contacts: DataTypes.STRING,
        tel: DataTypes.STRING,
        fax: DataTypes.STRING,
        addr: DataTypes.STRING,
        remark: DataTypes.STRING,
        companyId: DataTypes.INTEGER,
        createUserId: DataTypes.INTEGER,
        modifyUserId: DataTypes.INTEGER
    });
    return Kh;
}