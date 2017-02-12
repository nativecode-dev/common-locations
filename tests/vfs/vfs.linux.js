const memfs = require('memfs')
const os = require('os')

const username = os.userInfo().username
const volume = new memfs.Volume()

const vfs = {
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
}

module.exports = name => {
  const path = require('path')

  Object.keys(vfs).forEach(key => {
    const location = path.join(key, name)
    vfs[location] = undefined
  })

  volume.mountSync('/', vfs)
  return volume
}
