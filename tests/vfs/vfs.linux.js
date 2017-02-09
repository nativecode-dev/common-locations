const memfs = require('memfs')
const os = require('os')
const util = require('util')

const username = os.userInfo().username
const volume = new memfs.Volume()

module.exports = {
  mount: volume.mountSync('/', {
    [os.homedir()]: undefined,
    '/bin': undefined,
    '/etc': undefined,
    '/opt': undefined,
    '/opt/etc': undefined,
    '/opt/local': undefined,
    '/usr': undefined,
    '/usr/bin': undefined,
    '/usr/etc': undefined,
    '/usr/local': undefined,
    '/usr/local/bin': undefined,
    '/usr/local/etc': undefined
  }),
  volume: volume
}
