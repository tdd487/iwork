const db = require('../db/index');

exports.create = function *(let1) {
  if (let1.parentId === '') {
    delete let1.parentId
  }
  let1.les = let1.les.map((t) => {
    return {
      letId: let1.id
    }
  })
  return yield db.sequelize.Let.create(let1, {
    include: {
      model: db.sequelize.Le,
      as: 'les'
    }
  });
}

exports.update = function *(let1) {
  if (let1.parentId === '') {
    let1.parentId = null
  }
  let1.les = let1.les.map((t) => {
    return {
      letId: let1.id
    }
  })
  return yield db.sequelize.client.transaction(function (t) {
    return db.sequelize.Let.update(let1, {where: {id: let1.id}, transaction: t})
    // 先删除旧的
      .then(function () {
        return db.sequelize.Le.destroy({where: {letId: let1.id}, transaction: t})
      })
      // 添加新的
      .then(function () {
        return db.sequelize.Le.bulkCreate(let1.les, {transaction: t})
      })
      // 返回新的数据
      .then(function () {
        return db.sequelize.Let.findById(let1.id,
          {
            attributes: {exclude: ['createdAt', 'updatedAt']},
            transaction: t
          }
        );
      })
  })
}

exports.findById = function *(id) {
  return yield db.sequelize.Let.findById(id, {
    attributes: {exclude: ['createdAt', 'updatedAt']},
    include: [{model: db.sequelize.Le, as: 'les', attributes: {exclude: ['createdAt', 'updatedAt']}}],
  })
}

exports.findAll = function *() {
  let lets = yield db.sequelize.Let.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']},
    order: [['id', 'ASC']],
    include: [{model: db.sequelize.Let, as: 'children', attributes: {exclude: ['createdAt', 'updatedAt']}}],
    where: {parentId: null}
  });
  lets.forEach(t => {
    t.children.sort((a, b) => a.sort - b.sort)
  })
  return lets;
}

exports.del = function *(id) {
  return yield db.sequelize.client.transaction(function (t) {
    return db.sequelize.Le.destroy({where: {letId: id}, transaction: t})
      .then(function () {
        return db.sequelize.Let.destroy({where: {id: id}, transaction: t})
      })
      .then(function () {
        return db.sequelize.Let.destroy({where: {id: id}, transaction: t})
      })
  })
}