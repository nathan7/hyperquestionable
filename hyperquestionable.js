var hyperquest = require('hyperquest')
  , once = require('once')

module.exports =
function hyperquestionable(url, opts, cb) {
  if (typeof opts === 'function') cb = opts, opts = null
  cb = once(cb)
  var data = ''
    , res
  hyperquest(url)
    .on('data', function(chunk) { data += chunk })
    .on('end', function() { cb(null, data, res) })
    .on('error', function(err) { cb(err, data, res) })
    .on('response', function(_res) { res = _res })
}
