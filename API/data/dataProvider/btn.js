const db = require('../db/index');

exports.create = function *(model) {
  return yield db.sequelize.Btn.create(model);
}

exports.findAll = function *(query) {
  let page = yield db.sequelize.Btn.findAndCountAll({
    attributes: {exclude: ['createdAt', 'updatedAt']},
    order: [['sort', 'ASC']],
    offset: query.offset,
    limit: query.limit
  })
  return page;
}

exports.del = function *(id) {
  return db.sequelize.Btn.destroy({where: {id: id}})
}

exports.update = function *(model) {
    return db.sequelize.Btn.update(model, {where: {id: model.id}})
}