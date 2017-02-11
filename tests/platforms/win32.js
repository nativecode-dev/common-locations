const os = require('os')
const util = require('util')

const username = os.userInfo().username

module.exports = name => {
  return {
    app: {
      local: util.format('C:\\Program Files\\%s', name),
      system: util.format('C:\\Program Files\\%s', name),
      user: util.format('C:\\Program Files\\%s', name)
    },
    binaries: {
      local: util.format('C:\\Program Files\\%s', name),
      system: util.format('C:\\Program Files\\%s', name),
      user: util.format('C:\\Program Files\\%s', name)
    },
    config: {
      local: util.format('C:\\Users\\%s\\AppData\\Local\\%s\\config', username, name),
      system: util.format('C:\\ProgramData\\%s\\config', name),
      user: util.format('C:\\Users\\%s\\AppData\\Roaming\\%s\\config', username, name)
    },
    home: util.format('C:\\Users\\%s', username),
    lib: {
      local: util.format('C:\\Program Files\\%s\\lib', name),
      system: util.format('C:\\Program Files\\%s\\lib', name),
      user: util.format('C:\\Program Files\\%s\\lib', name)
    },
    log: {
      local: util.format('C:\\Users\\%s\\AppData\\Local\\%s\\logs', username, name),
      system: util.format('C:\\ProgramData\\%s\\logs', name),
      user: util.format('C:\\Users\\%s\\AppData\\Roaming\\%s\\logs', username, name)
    },
    temp: util.format('C:\\Users\\%s\\AppData\\Local\\Temp\\%s', username, name)
  }
}
