const memfs = require('memfs')
const process = require('process')
const userinfo = require('common-userinfo')

const env = process.env
const username = userinfo.username
const volume = new memfs.Volume()

const vfs = {
  [userinfo.homedir]: undefined,
  [env.ALLUSERSPROFILE]: undefined,
  [env.APPDATA]: undefined,
  [env.LOCALAPPDATA]: undefined,
  [(env.PROGRAMFILES || env.ProgramFiles)]: undefined,
  [env.CommonProgramFiles]: undefined
}

module.exports = name => {
  const path = require('path')

  Object.keys(vfs).forEach(key => {
    const location = path.join(key, name)
    vfs[location] = undefined
  })

  volume.mountSync('.', vfs)
  return volume
}
