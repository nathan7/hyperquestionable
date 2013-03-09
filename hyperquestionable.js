var hyperquest = require('hyperquest')
  , once = require('once')

module.exports =
function hyperquestionable(url, opts, cb) {
  if (typeof opts === 'function') cb = opts, opts = null
  cb = once(cb)
  var data = ''
  hyperquest(url)
    .on('data', function(chunk) { data += chunk })
    .on('end', function() { cb(null, data) })
    .on('error', cb)
    .on('response', function(res) {
      if (res.statusCode !== 200) {
        var err = new Error('HTTP ' + res.statusCode)
        err.statusCode = res.statusCode
        cb(err)
      }
    })
}
