const db = require('../db/index');

exports.create = function *(model) {
  return yield db.sequelize.Le.create(model);
}
exports.findAll = function *(query) {
  let page = yield db.sequelize.Le.findAndCountAll({
    attributes: {exclude: ['createdAt', 'updatedAt']},
    order: [['id', 'ASC']],
    offset: query.offset,
    limit: query.limit,
    raw: true
  })
  return page;
}
exports.getLeList = function *(query) {
  let page = yield db.sequelize.Le.findAndCountAll({
    attributes: {exclude: ['createdAt', 'updatedAt']},
    order: [['id', 'DESC']],
    where: {letId: query.letId},
    offset: query.offset,
    limit: query.limit
  })
  return page;
}

exports.del = function *(id) {
  return db.sequelize.Le.destroy({where: {id: id}})
}

exports.update = function *(model) {
  return db.sequelize.Le.update(model, {where: {id: model.id}})
}
