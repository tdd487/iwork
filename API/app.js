const koa = require('koa')
const app = koa()
const responseTime = require('koa-response-time')
const log4js = require('koa-log4')
const favicon = require('koa-favicon')
const compress = require('koa-compress')
const co = require('co');
const mount = require('koa-mount')
const services = require('./services')
const db = require('./data/db')
const cors = require('koa-cors')
const serve = require('koa-static')
const session = require('koa-session-redis3')
log4js.configure({
  appenders: [
    {type: 'console'},
    {
      type: 'dateFile', filename: 'logs/app.log', pattern: "-yyyy-MM-dd", alwaysIncludePattern: false, category: 'app',
      usefsync: true
    }
  ]
})
const logger = log4js.getLogger('app')

co(function *() {
  // let connection = yield db.sequelize.client.sync({force: true})
  let connection = yield db.sequelize.client.sync()
  if (connection) {
    app.listen(3000);
    console.log('启动成功,端口:3000');
  }
})

// app.use(favicon(__dirname + '/favicon.ico'))
app.use(responseTime())
app.use(log4js.koaLogger(logger, {level: 'auto'}))
app.use(compress())
app.use(cors({credentials: true}))
app.use(serve('uploads', {maxage: 2 * 60 * 1000}))

app.keys = ['hahah123124#$%^s3423'];
app.use(session({
    cookie: {
      maxage: null
    },
    store: {
      host: '127.0.0.1',
      port: 6379,
      ttl: 3600 * 24,
      keySchema: 'dibang'
    }
  }
))
app.use(function *(next) {
  //除了登陆和注册页面，都需要授权
  if (this.request.url === '/v1/user/login' || this.request.url === '/v1/user/reg') {
    return yield next
  }
  if (this.session.userId) {
    db.sequelize.setSession(this.session)
    // 不需要验证用户权限的请求
    if (this.request.url.indexOf('/v1/public/') === 0) {
      return yield next
    }
    // 验证权限
    let url = this.request.url.substring(3).split('?')[0]
    console.log(url)
    if (this.session.userUrls && this.session.userUrls.indexOf(url) >= 0) {
      yield next
    } else {
      this.status = 401;
      this.body = {
        success: false,
        message: '身份认证失败'
      }
    }
  } else {
    this.status = 401;
    this.body = {
      success: false,
      message: '身份认证失败'
    }
  }
})
app.use(mount('/v1', services.v1));

app.on('error', function (err, ctx) {
  // console.log ('server error', err);
  // logger.error ('%s %s - %s', err, ctx)
  logger.error('server error', err)
});
