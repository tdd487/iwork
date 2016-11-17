const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const log4js = require('koa-log4')
log4js.configure({
  appenders: [
    // {type: 'console'},
    {type: 'dateFile', filename: 'logs/db.log', pattern: "-yyyy-MM-dd", alwaysIncludePattern: false, category: 'db', usefsync: true}
  ]
})
// let logger = log4js.getLogger('db');
var session = {}

const client = new Sequelize('', null, null, {
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage: './data/db/db.db',
  define: {
    hooks: {
      beforeCreate (instance) {
        instance.set('createUserId', session.userId)
      },
      beforeUpdate (instance) {
        instance.set('modifyUserId', session.userId)
        instance.set('createUserId', null)
        instance.set('createdAt', null)
        instance.set('updatedAt', null)
      },
      afterCreate (instance) {
        // logger.info('asdasdasd')
      },
      afterUpdate (instance) {
      },
      afterDestroy (instance) {
      }
    }
  }
});
const models = {};

// read all models and import them into the "db" object
fs.readdirSync(__dirname + '/models')
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function (file) {
    const model = client.import(path.join(__dirname + '/models', file));
    models[model.name] = model;
  });

Object.keys(models).forEach(function (modelName) {
  if (models[modelName].options.hasOwnProperty('associate')) {
    models[modelName].options.associate(models);
  }
});
module.exports = models;
module.exports.client = client;
module.exports.setSession = function (appSession) {
  session = appSession
}