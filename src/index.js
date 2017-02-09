const fs = require('fs')
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
    app.local = process.env.LOCALAPPDATA
    app.system = process.env.PROGRAMFILES
    app.user = paths.home
    binaries.local = process.env.LOCALAPPDATA
    binaries.system = process.env.PROGRAMFILES
    binaries.user = paths.home
    paths.config.local = process.env.LOCALAPPDATA
    paths.config.system = process.env.ALLUSERPROFILE
    paths.config.user = path.join(paths.home, 'settings')
    break;

  default:
    app.local = '/usr/local'
    app.system = '/opt/local'
    app.user = paths.home
    binaries.local = '/usr/local/bin'
    binaries.system = '/bin'
    binaries.user = '/usr/bin'
    paths.config.local = '/usr/etc'
    paths.config.system = '/etc'
    paths.config.user = path.join(paths.home, 'etc')
    break;
}

const pathify = (force, directory, ...args) => {
  const dir = path.join(directory, ...args)
  if (force === true) {
    fs.mkdirSync(dir)
  }
  return dir
}

module.exports = {
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
