var ffi = require("ffi")
var ref = require("ref")
var int = ref.types.int
var mathlibLoc = null
mathlibLoc = "./Release/math.dll"

var math = ffi.Library(mathlibLoc, {
  add: [int, [int, int]],
  minus: [int, [int, int]],
  multiply: [int, [int, int]],
})

module.exports = math