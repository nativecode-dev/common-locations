const memfs = require('memfs')
const os = require('os')
const process = require('process')
const util = require('util')

const env = process.env
const username = os.userInfo().username
const volume = new memfs.Volume()

module.exports = {
  mount: volume.mountSync('C:\\', {
    [os.homedir()]: undefined,
    [env.ALLUSERSPROFILE]: undefined,
    [env.APPDATA]: undefined,
    [env.LOCALAPPDATA]: undefined,
    [env.PROGRAMFILES]: undefined,
    [env.CommonProgramFiles]: undefined
  }),
  volume: volume
}
