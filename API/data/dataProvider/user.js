const db = require('../db/index');

exports.findUser = function *(user) {
  return yield db.sequelize.User.findOne({
    where: {username: user.username, password: user.password}
  });
}
exports.create = function *(model) {
  model.userRoles = [{roleId: model.roleId}]
  return yield db.sequelize.User.create(model, {include: {model: db.sequelize.UserRole, as: 'userRoles'}});
}
exports.findByUserName = function *(username) {
  return yield db.sequelize.User.findOne({where: {username: username}});
}

exports.findAll = function *(query) {
  let page = yield db.sequelize.User.findAndCountAll({
    attributes: {exclude: ['createdAt', 'updatedAt', 'password']},
    include: [{
      model: db.sequelize.UserRole, as: 'userRoles', attributes: ['id'],
      include: [{model: db.sequelize.Role, as: 'role', attributes: ['id']}]
    }],
    order: [['id', 'ASC']],
    offset: query.offset,
    limit: query.limit,
    raw: true
  })
  return page;
}

exports.del = function *(id) {
  return yield db.sequelize.client.transaction(function (t) {
    return db.sequelize.UserRole.destroy({where: {userId: id}, transaction: t})
      .then(function () {
        return db.sequelize.User.destroy({where: {id: id}, transaction: t})
      })
  })
}

exports.update = function *(model) {
  return yield db.sequelize.client.transaction(function (t) {
    return db.sequelize.UserRole.destroy({where: {userId: model.id}, transaction: t})
      .then(function () {
        return db.sequelize.User.update(model, {where: {id: model.id}, transaction: t})
      })
      .then(function () {
        return db.sequelize.UserRole.create({userId: model.id, roleId: model.roleId}, {transaction: t})
      })

  })
}

exports.getUserAuth = function *(userId) {
  /* let sql = `SELECT m1.name AS m1Name,m1.icon AS m1Icon,m.name AS menuName,m.code AS menuCode,m.icon AS menuIcon,
   b.code AS btnCode,b.name AS btnName, b.icon AS btnIcon FROM Menus AS m1
   LEFT JOIN Menus m ON m.parentId = m1.id
   LEFT JOIN MenuBtns mb ON mb.menuId = m.id
   LEFT JOIN Btns b ON b.id = mb.btnId
   LEFT JOIN RoleMenuBtns rbt ON rbt.menuBtnId = mb.id
   LEFT JOIN Roles r ON r.id = rbt.roleId
   LEFT JOIN UserRoles ur ON ur.roleId = r.id
   LEFT JOIN Users u ON u.id = ur.userId
   WHERE u.id = ${userId} ORDER BY m1.sort, m.sort, b.sort`
   return yield db.sequelize.client.query(sql) */
  return db.sequelize.Menu.findAll({
    attributes: ['name', 'icon'],
    include: [{
      model: db.sequelize.Menu, as: 'children', attributes: ['name', 'icon', 'code'],
      include: [{
        model: db.sequelize.MenuBtn, as: 'menuBtns', attributes: ['id'],
        include: [{
          model: db.sequelize.Btn, as: 'btn', attributes: ['name', 'code', 'icon']
        }, {
          model: db.sequelize.RoleMenuBtn, as: 'roleMenuBtns', attributes: ['id'],
          include: [{
            model: db.sequelize.Role, as: 'role', attributes: ['id'],
            include: [{
              model: db.sequelize.UserRole, as: 'userRoles', attributes: ['id'],
              include: [{
                model: db.sequelize.User, as: 'user', attributes: ['id'], where: {id: userId}
              }]
            }]
          }]
        }]
      }]
    }],
    order: [['sort'], [{model: db.sequelize.Menu, as: 'children'}, 'sort'],
      [{model: db.sequelize.Menu, as: 'children'},{model: db.sequelize.MenuBtn, as: 'menuBtns'},{model: db.sequelize.Btn, as: 'btn'},'sort']]
  })
}