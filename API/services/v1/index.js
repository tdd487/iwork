const Router = require('koa-router')
const router = new Router()
const mkdirp = require('mkdirp')

const multer = require('koa-router-multer');
var path
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    path = new Date().getFullYear() + '' + (new Date().getMonth() + 1)
    const filePath = 'uploads/' + path
    mkdirp.sync(filePath)
    cb(null, filePath)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage})

router.post('/upload', upload.single('file'), function *() {
  this.body = this.protocol + '://' + this.headers.host + '/' + path + '/' + this.file.filename
})

require('./public').register(router);
require('./user').register(router);
require('./menu').register(router);
require('./btn').register(router);
require('./role').register(router);
require('./kht').register(router);
require('./kh').register(router);
require('./le').register(router);
require('./let').register(router);
require('./company').register(router)
require('./department').register(router)
module.exports = router.middleware();
