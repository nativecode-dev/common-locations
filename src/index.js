const lib = filesystem => {
  const debug = require('debug')
  const fs = filesystem || require('fs')
  const os = require('os')
  const path = require('path')
  const process = require('process')

  let paths = {
    app: {
      local: undefined,
      system: undefined,
      user: undefined
    },
    binaries: {
      local: undefined,
      system: undefined,
      user: undefined
    },
    config: {
      local: undefined,
      system: undefined,
      user: undefined
    },
    home: os.homedir(),
    temp: os.tmpdir()
  }

  switch (os.platform()) {
    case "win32":
      paths.app.local = process.env.LOCALAPPDATA
      paths.app.system = process.env.PROGRAMFILES
      paths.app.user = paths.home
      paths.binaries.local = process.env.LOCALAPPDATA
      paths.binaries.system = process.env.PROGRAMFILES
      paths.binaries.user = paths.home
      paths.config.local = process.env.LOCALAPPDATA
      paths.config.system = process.env.ALLUSERPROFILE
      paths.config.user = path.join(paths.home, 'settings')
      break;

    default:
      paths.app.local = '/usr/local'
      paths.app.system = '/opt/local'
      paths.app.user = paths.home
      paths.binaries.local = '/usr/local/bin'
      paths.binaries.system = '/bin'
      paths.binaries.user = '/usr/bin'
      paths.config.local = '/usr/etc'
      paths.config.system = '/etc'
      paths.config.user = path.join(paths.home, 'etc')
      break;
  }

  const pathify = (directory, ...args) => {
    return path.join(directory, ...args)
  }

  return {
    app: {
      local: (...args) => pathify(paths.app.local, ...args),
      system: (...args) => pathify(paths.app.system, ...args),
      user: (...args) => pathify(paths.app.user, ...args)
    },
    binaries: {
      local: (...args) => pathify(paths.binaries.local, ...args),
      system: (...args) => pathify(paths.binaries.system, ...args),
      user: (...args) => pathify(paths.binaries.user, ...args)
    },
    config: {
      local: (...args) => pathify(paths.config.local, ...args),
      system: (...args) => pathify(paths.config.system, ...args),
      user: (...args) => pathify(paths.config.user, ...args)
    },
    home: (...args) => pathify(paths.home, ...args),
    temp: (...args) => pathify(paths.temp, ...args)
  }
}

module.exports = lib()
module.exports.use = filesystem => lib(filesystem)
