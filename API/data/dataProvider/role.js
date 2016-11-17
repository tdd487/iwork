const db = require('../db/index');

exports.create = function *(model) {
  return yield db.sequelize.Role.create(model);
}

exports.findAll = function *(query) {
  var page = yield db.sequelize.Role.findAndCountAll({
    attributes: {exclude: ['createdAt', 'updatedAt']},
    order: [['id', 'ASC']],
    offset: query.offset,
    limit: query.limit
  })
  return page;
}

exports.del = function *(id) {
  return db.sequelize.Role.destroy({where: {id: id}})
}

exports.update = function *(model) {
  return db.sequelize.Role.update(model, {where: {id: model.id}})
}

exports.getAuth = function *(query) {
  let data = {}
  // 当前菜单的菜单按钮
  data.menuBtns = yield db.sequelize.MenuBtn.findAll({
    where: {menuId: query.menuId},
    attributes: ['id', 'menuId', 'btnId'],
    include: [{model: db.sequelize.Btn, as: 'btn', attributes: ['id', 'name', 'sort']}],
    order: [[{model: db.sequelize.Btn, as: 'btn'}, 'sort', 'ASC']]
  }).map(t => {
    return {
      id: t.id,
      btnId: t.btn.id,
      btnName: t.btn.name,
      btnSort: t.btn.sort
    }
  })
  // data.menuBtns.sort((t1, t2) => t1.btnSort - t2.btnSort)
  // 当前角色的菜单按钮权限
  data.roleMenuBtns = yield db.sequelize.RoleMenuBtn.findAll({
    where: {roleId: query.roleId},
    attributes: ['id', 'menuBtnId'],
    include: [{model: db.sequelize.MenuBtn, as: 'menuBtn', where: {menuId: query.menuId}}]
  })
  return data
}

exports.auth = function *(data) {
  let roleMenuBtns = data.menuBtnIds.map(t => {
    return {
      roleId: data.roleId,
      menuBtnId: t
    }
  })
  return yield db.sequelize.client.transaction(function (t) {
    return db.sequelize.RoleMenuBtn.destroy({
      where: {roleId: data.roleId, menuBtnId: {$in: data.oldMenuBtnIds}}, transaction: t
    })
      .then(function () {
        return db.sequelize.RoleMenuBtn.bulkCreate(roleMenuBtns, {transaction: t})
      })
  })
}