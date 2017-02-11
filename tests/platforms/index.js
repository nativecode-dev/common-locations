const os = require('os')
const path = require('path')
const platform = os.platform()

module.exports = name => require(path.join(__dirname, platform))(name)
