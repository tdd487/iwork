const db = require('../db/index');

exports.create = function *(kh) {
    return yield db.sequelize.Kh.create(kh);
}

exports.update = function *(kh) {
    return yield db.sequelize.client.transaction(function (t) {
        return db.sequelize.Kh.update(kh, {where: {id: kh.id}, transaction: t})
            .then(function () {
                return db.sequelize.Kh.findById(kh.id,
                    {
                        attributes: {exclude: ['createdAt', 'updatedAt']},
                        transaction: t
                    }
                );
            })
    })
}

exports.findById = function *(id) {
    return yield db.sequelize.Kh.findById(id, {
        attributes: {exclude: ['createdAt', 'updatedAt']}
    })
}

exports.getKhList = function *(query) {
    let page = yield db.sequelize.Kh.findAndCountAll({
        attributes: {exclude: ['createdAt', 'updatedAt']},
        order: [['id', 'DESC']],
        where: {khtId: query.khtId},
        offset: query.offset,
        limit: query.limit
    })
    return page;
}

exports.del = function *(id) {
    return  db.sequelize.Kh.destroy({where: {id: id}})
}