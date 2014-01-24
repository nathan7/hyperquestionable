var hyperquest = require('hyperquest')
  , concat = require('concat-stream')

module.exports =
function hyperquestionable(url, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = null
  }

  hyperquest(url, opts, function(err, res) {
    if (err) return cb(err)
    res.pipe(concat(function(data) {
      cb(null, res, data)
    }))
  })
}
