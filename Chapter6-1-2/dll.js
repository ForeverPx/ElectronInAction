var ffi = require("ffi")
var ref = require("ref")
var int = ref.types.int

var demoDll = "./Release/demo.dll"

var demo = ffi.Library(demoDll, {
  sum: [int, [int]]
})

module.exports = demo