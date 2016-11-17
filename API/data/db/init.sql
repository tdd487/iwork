INSERT INTO "Menus" VALUES (1, 'dev', '开发管理', null, null, 3, null, null, '2016-11-11', '2016-11-14 09:01:58.423 +00:00', null);
INSERT INTO "Menus" VALUES (2, 'btn', '按钮管理', null, null, 1, null, null, '2016-11-11', '2016-11-11', 1);
INSERT INTO "Menus" VALUES (3, 'menu', '菜单管理', null, null, 2, null, null, '2016-11-11', '2016-11-11', 1);
INSERT INTO "Menus" VALUES (4, 'role', '系统管理', null, null, 2, null, null, '2016-11-11', '2016-11-14 09:02:05.402 +00:00', null);
INSERT INTO "Menus" VALUES (5, 'role', '角色管理', null, null, 3, null, null, '2016-11-11', '2016-11-11', 4);
INSERT INTO "Menus" VALUES (6, 'basicdata', '基础资料', null, null, 1, 1, null, '2016-11-14 09:01:30.901 +00:00', '2016-11-14 09:01:30.901 +00:00', null);
INSERT INTO "Menus" VALUES (7, 'kht', '单位分类', null, null, 1, 1, null, '2016-11-14 09:04:44.846 +00:00', '2016-11-14 09:04:44.846 +00:00', 6);
INSERT INTO "Menus" VALUES (8, 'kh', '单位资料', null, null, 2, 1, null, '2016-11-14 09:05:14.537 +00:00', '2016-11-14 09:05:14.537 +00:00', 6);

INSERT INTO "Btns" ("code", "name", "icon", "sort", "createdAt", "updatedAt") VALUES ('list', '浏览', 'el-icon-search', '1', '2016-11-11', '2016-11-11');
INSERT INTO "Btns" ("code", "name", "icon", "sort", "createdAt", "updatedAt") VALUES ('add', '新增', 'el-icon-plus', '2', '2016-11-11', '2016-11-11');
INSERT INTO "Btns" ("code", "name", "icon", "sort", "createdAt", "updatedAt") VALUES ('update', '修改', 'el-icon-edit', '3', '2016-11-11', '2016-11-11');
INSERT INTO "Btns" ("code", "name", "icon", "sort", "createdAt", "updatedAt") VALUES ('del', '删除', 'el-icon-delete', '4', '2016-11-11', '2016-11-11');
INSERT INTO "Btns" ("code", "name", "icon", "sort", "createdAt", "updatedAt") VALUES ('auth', '授权', 'el-icon-document', '5', '2016-11-11', '2016-11-11');

INSERT INTO "Roles" ("code", "name", "createdAt", "updatedAt") VALUES ('admin', '超级管理员', '2016-11-11', '2016-11-11');

INSERT INTO "Users" ("username", "password", "createdAt", "updatedAt") VALUES ('cc', 'e0323a9039add2978bf5b49550572c7c', '2016-11-11', '2016-11-11');

INSERT INTO "UserRoles" ("userId", "roleId", "createdAt", "updatedAt") VALUES ('1', '1', '2016-11-11', '2016-11-11');

INSERT INTO "MenuBtns" VALUES (1, '2016-11-11', '2016-11-11', 1, 2);
INSERT INTO "MenuBtns" VALUES (2, '2016-11-11', '2016-11-11', 2, 2);
INSERT INTO "MenuBtns" VALUES (3, '2016-11-11', '2016-11-11', 3, 2);
INSERT INTO "MenuBtns" VALUES (4, '2016-11-11', '2016-11-11', 4, 2);
INSERT INTO "MenuBtns" VALUES (5, '2016-11-11', '2016-11-11', 1, 3);
INSERT INTO "MenuBtns" VALUES (6, '2016-11-11', '2016-11-11', 2, 3);
INSERT INTO "MenuBtns" VALUES (7, '2016-11-11', '2016-11-11', 3, 3);
INSERT INTO "MenuBtns" VALUES (8, '2016-11-11', '2016-11-11', 4, 3);
INSERT INTO "MenuBtns" VALUES (9, '2016-11-11', '2016-11-11', 1, 5);
INSERT INTO "MenuBtns" VALUES (10, '2016-11-11', '2016-11-11', 2, 5);
INSERT INTO "MenuBtns" VALUES (11, '2016-11-11', '2016-11-11', 3, 5);
INSERT INTO "MenuBtns" VALUES (12, '2016-11-11', '2016-11-11', 4, 5);
INSERT INTO "MenuBtns" VALUES (13, '2016-11-11', '2016-11-11', 5, 5);
INSERT INTO "MenuBtns" VALUES (14, '2016-11-14 09:04:44.865 +00:00', '2016-11-14 09:04:44.865 +00:00', 1, 7);
INSERT INTO "MenuBtns" VALUES (15, '2016-11-14 09:04:44.865 +00:00', '2016-11-14 09:04:44.865 +00:00', 2, 7);
INSERT INTO "MenuBtns" VALUES (16, '2016-11-14 09:04:44.865 +00:00', '2016-11-14 09:04:44.865 +00:00', 3, 7);
INSERT INTO "MenuBtns" VALUES (17, '2016-11-14 09:04:44.867 +00:00', '2016-11-14 09:04:44.867 +00:00', 4, 7);
INSERT INTO "MenuBtns" VALUES (18, '2016-11-14 09:05:14.552 +00:00', '2016-11-14 09:05:14.552 +00:00', 1, 8);
INSERT INTO "MenuBtns" VALUES (19, '2016-11-14 09:05:14.552 +00:00', '2016-11-14 09:05:14.552 +00:00', 2, 8);
INSERT INTO "MenuBtns" VALUES (20, '2016-11-14 09:05:14.553 +00:00', '2016-11-14 09:05:14.553 +00:00', 3, 8);
INSERT INTO "MenuBtns" VALUES (21, '2016-11-14 09:05:14.553 +00:00', '2016-11-14 09:05:14.553 +00:00', 4, 8);

INSERT INTO "RoleMenuBtns" VALUES (1, '2016-11-11', '2016-11-11', 1, 1);
INSERT INTO "RoleMenuBtns" VALUES (2, '2016-11-11', '2016-11-11', 2, 1);
INSERT INTO "RoleMenuBtns" VALUES (3, '2016-11-11', '2016-11-11', 3, 1);
INSERT INTO "RoleMenuBtns" VALUES (4, '2016-11-11', '2016-11-11', 4, 1);
INSERT INTO "RoleMenuBtns" VALUES (5, '2016-11-11', '2016-11-11', 5, 1);
INSERT INTO "RoleMenuBtns" VALUES (6, '2016-11-11', '2016-11-11', 6, 1);
INSERT INTO "RoleMenuBtns" VALUES (7, '2016-11-11', '2016-11-11', 7, 1);
INSERT INTO "RoleMenuBtns" VALUES (8, '2016-11-11', '2016-11-11', 8, 1);
INSERT INTO "RoleMenuBtns" VALUES (9, '2016-11-11', '2016-11-11', 9, 1);
INSERT INTO "RoleMenuBtns" VALUES (10, '2016-11-11', '2016-11-11', 10, 1);
INSERT INTO "RoleMenuBtns" VALUES (11, '2016-11-11', '2016-11-11', 11, 1);
INSERT INTO "RoleMenuBtns" VALUES (12, '2016-11-11', '2016-11-11', 12, 1);
INSERT INTO "RoleMenuBtns" VALUES (13, '2016-11-11', '2016-11-11', 13, 1);
INSERT INTO "RoleMenuBtns" VALUES (14, '2016-11-14 09:05:30.310 +00:00', '2016-11-14 09:05:30.310 +00:00', 14, 1);
INSERT INTO "RoleMenuBtns" VALUES (15, '2016-11-14 09:05:30.310 +00:00', '2016-11-14 09:05:30.310 +00:00', 15, 1);
INSERT INTO "RoleMenuBtns" VALUES (16, '2016-11-14 09:05:30.310 +00:00', '2016-11-14 09:05:30.310 +00:00', 16, 1);
INSERT INTO "RoleMenuBtns" VALUES (17, '2016-11-14 09:05:30.310 +00:00', '2016-11-14 09:05:30.310 +00:00', 17, 1);
INSERT INTO "RoleMenuBtns" VALUES (18, '2016-11-14 09:05:37.261 +00:00', '2016-11-14 09:05:37.261 +00:00', 18, 1);
INSERT INTO "RoleMenuBtns" VALUES (19, '2016-11-14 09:05:37.261 +00:00', '2016-11-14 09:05:37.261 +00:00', 19, 1);
INSERT INTO "RoleMenuBtns" VALUES (20, '2016-11-14 09:05:37.261 +00:00', '2016-11-14 09:05:37.261 +00:00', 20, 1);
INSERT INTO "RoleMenuBtns" VALUES (21, '2016-11-14 09:05:37.261 +00:00', '2016-11-14 09:05:37.261 +00:00', 21, 1);
