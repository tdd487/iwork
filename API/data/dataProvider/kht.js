const db = require('../db/index');

exports.create = function *(kht) {
    if (kht.parentId === '') {
        delete kht.parentId
    }
    return yield db.sequelize.Kht.create(kht);
}

exports.update = function *(kht) {
    if (kht.parentId === '') {
        kht.parentId = null
    }
    return yield db.sequelize.client.transaction(function (t) {
        return db.sequelize.Kht.update(kht, {where: {id: kht.id}, transaction: t})
        // 返回新的菜单数据
            .then(function () {
                return db.sequelize.Kht.findById(kht.id,
                    {
                        attributes: {exclude: ['createdAt', 'updatedAt']},
                        transaction: t
                    }
                );
            })
    })
}

exports.findById = function *(id) {
    return yield db.sequelize.Kht.findById(id, {
        attributes: {exclude: ['createdAt', 'updatedAt']}
    })
}

exports.findAll = function *() {
    let khts = yield db.sequelize.Kht.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']},
        order: [['sort', 'ASC']],
        include: [{model: db.sequelize.Kht, as: 'children', attributes: {exclude: ['createdAt', 'updatedAt']}}],
        where: {parentId: null}
    });
    khts.forEach(t => {
        t.children.sort((a, b) => a.sort - b.sort)
    })
    return khts;
}

exports.del = function *(id) {
    return  db.sequelize.Kht.destroy({where: {id: id}})
}