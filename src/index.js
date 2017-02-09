module.exports = filesystem => {
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

  const pathify = (force, directory, ...args) => {
    const dir = path.join(directory, ...args)
    debug(dir)

    if (force === true && !fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }

    return dir
  }

  return {
    app: {
      local: (force, ...args) => pathify(force, paths.app.local, ...args),
      system: (force, ...args) => pathify(force, paths.app.system, ...args),
      user: (force, ...args) => pathify(force, paths.app.user, ...args)
    },
    binaries: {
      local: (force, ...args) => pathify(force, paths.binaries.local, ...args),
      system: (force, ...args) => pathify(force, paths.binaries.system, ...args),
      user: (force, ...args) => pathify(force, paths.binaries.user, ...args)
    },
    config: {
      local: (force, ...args) => pathify(force, paths.config.local, ...args),
      system: (force, ...args) => pathify(force, paths.config.system, ...args),
      user: (force, ...args) => pathify(force, paths.config.user, ...args)
    },
    home: (force, ...args) => pathify(force, paths.home, ...args),
    temp: (force, ...args) => pathify(force, paths.temp, ...args)
  }
}
