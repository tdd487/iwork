exports.success = true
exports.data = {}
exports.message = '操作成功'
exports.setBody = function setBody(success,message) {
  return {
    success: success,
    data: this.data,
    message: message || this.message
  }
}