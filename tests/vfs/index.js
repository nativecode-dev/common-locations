const os = require('os')

module.exports = name => {
  switch (os.platform()) {
    case 'darwin':
      return require('./vfs.darwin.js')(name)
    case 'win32':
      return require('./vfs.win32.js')(name)
    default:
      return require('./vfs.linux.js')(name)
  }
}
