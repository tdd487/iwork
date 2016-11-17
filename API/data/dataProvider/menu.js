const db = require('../db/index');

exports.create = function *(menu) {
  if (menu.parentId === '') {
    delete menu.parentId
  }
  menu.menuBtns = menu.menuBtns.map((t) => {
    return {
      menuId: menu.id,
      btnId: t
    }
  })
  return yield db.sequelize.Menu.create(menu, {
    include: {
      model: db.sequelize.MenuBtn,
      as: 'menuBtns'
    }
  });
}

exports.update = function *(menu) {
  if (menu.parentId === '') {
    menu.parentId = null
  }
  menu.menuBtns = menu.menuBtns.map((t) => {
    return {
      menuId: menu.id,
      btnId: t
    }
  })
  return yield db.sequelize.client.transaction(function (t) {
    return db.sequelize.Menu.update(menu, {where: {id: menu.id}, transaction: t})
    // 先删除旧的菜单按钮
      .then(function () {
        return db.sequelize.MenuBtn.destroy({where: {menuId: menu.id}, transaction: t})
      })
      .then(function () {
        return db.sequelize.RoleMenuBtn.destroy({where: {menuBtnId: null}, transaction: t})
      })
      // 添加新的菜单按钮
      .then(function () {
        return db.sequelize.MenuBtn.bulkCreate(menu.menuBtns, {transaction: t})
      })
      // 返回新的菜单数据
      .then(function () {
        return db.sequelize.Menu.findById(menu.id,
          {
            attributes: {exclude: ['createdAt', 'updatedAt']},
            transaction: t
          }
        );
      })
  })
}

exports.findById = function *(id) {
  return yield db.sequelize.Menu.findById(id, {
    attributes: {exclude: ['createdAt', 'updatedAt']},
    include: [{model: db.sequelize.MenuBtn, as: 'menuBtns', attributes: {exclude: ['createdAt', 'updatedAt']}}],
  })
}

exports.findAll = function *() {
  let menus = yield db.sequelize.Menu.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']},
    order: [['sort', 'ASC']],
    include: [{model: db.sequelize.Menu, as: 'children', attributes: {exclude: ['createdAt', 'updatedAt']}}],
    where: {parentId: null}
  });
  menus.forEach(t => {
    t.children.sort((a, b) => a.sort - b.sort)
  })
  return menus;
}

exports.del = function *(id) {
  return yield db.sequelize.client.transaction(function (t) {
    return db.sequelize.MenuBtn.destroy({where: {menuId: id}, transaction: t})
      .then(function () {
        return db.sequelize.Menu.destroy({where: {id: id}, transaction: t})
      })
      .then(function () {
        return db.sequelize.Menu.destroy({where: {id: id}, transaction: t})
      })
  })
}