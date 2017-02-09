const os = require('os')

switch (os.platform()) {
  case 'darwin':
    module.exports = require('./vfs.darwin.js')
    break;

  case 'win32':
    module.exports = require('./vfs.win32.js')
    break;

  default:
    module.exports = require('./vfs.linux.js')
    break;
}
