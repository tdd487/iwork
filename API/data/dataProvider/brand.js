const db = require('../db/index');

exports.create = function *(model) {
  return yield db.sequelize.Company.create(model);
}
exports.findAll = function *(query) {
  var page = yield db.sequelize.Company.findAndCountAll({
    attributes: {exclude: ['createdAt', 'updatedAt']},
    order: [['id', 'ASC']],
    offset: query.offset,
    limit: query.limit
  })
  return page;
}
exports.update = function *(model) {
  return db.sequelize.Company.update(model, {where: {id: model.id}})
}

