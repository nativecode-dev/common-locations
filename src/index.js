const debug = require('debug')('common-locations')

const lib = (name, filesystem, env) => {
  if (env) debug('using custom env')
  if (filesystem) debug('using custom filesystem')
  if (name) debug('using custom app name')

  const fs = filesystem || require('fs')
  const os = require('os')
  const merge = require('merge')
  const path = require('path')
  const process = require('process')
  const envs = merge.recursive(true, env || {}, process.env)

  // NOTE: We use the following nomenclature to distinguish betwee the three
  // relevant locations that developers usually expect:
  // * [local]  - represents machine-specific locations
  // * [system] - represents machine-specific protected locations
  // * [user]   - represents machine-specific locations for a specific user.
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
    log: {
      local: undefined,
      system: undefined,
      user: undefined
    },
    temp: os.tmpdir()
  }

  // TODO: Add support for darwin.
  switch (os.platform()) {
    case "win32":
      // NOTE: On Windows, there's almost no difference between local, system,
      // and user because everything lives in "Program Files". We only make a
      // distinction for configuration and log data.
      const programs = envs.PROGRAMFILES || envs.ProgramFiles
      paths.app.local = path.join(programs, name)
      paths.app.system = path.join(programs, name)
      paths.app.user = path.join(programs, name)
      paths.binaries.local = path.join(programs, name)
      paths.binaries.system = path.join(programs, name)
      paths.binaries.user = path.join(programs, name)
      paths.config.local = path.join(envs.APPDATA, name, 'settings')
      paths.config.system = path.join(envs.ALLUSERSPROFILE, name, 'settings')
      paths.config.user = path.join(envs.LOCALAPPDATA, 'settings')
      paths.log.local = path.join(paths.app.local, 'logs')
      paths.log.system = path.join(paths.app.system, 'logs')
      paths.log.user = path.join(paths.app.user, 'logs')
      break;

    default:
      // NOTE: We prefer to use the FHS (http://www.pathname.com/fhs/pub/fhs-2.3.html)
      // locations for applications and data.
      // TODO: Should we also support BSD-type locations, like /usr/local?
      paths.app.local = path.join('/opt', name)
      paths.app.system = path.join('/opt', name)
      paths.app.user = path.join(paths.home, name)
      paths.binaries.local = '/opt/local/bin'
      paths.binaries.system = '/bin'
      paths.binaries.user = '/usr/local/bin'
      paths.config.local = path.join('/etc', name)
      paths.config.system = path.join('/etc', name)
      paths.config.user = path.join(paths.home, 'etc', name)
      paths.log.local = path.join('/var/opt', name, 'logs')
      paths.log.system = path.join('/var/opt', name, 'logs')
      paths.log.user = path.join('/var/opt', name, 'logs')
      break;
  }

  const pathify = (directory, args) => {
    let current = directory
    // TODO: make directories if they don't exist, one by one.
    args.forEach(arg => {
      current = path.join(current, arg)

      if (!fs.memfs && !fs.existsSync(current)) {
        fs.mkdirSync(current)
      }
    })

    return current
  }

  return {
    app: {
      local: (...args) => pathify(paths.app.local, args),
      system: (...args) => pathify(paths.app.system, args),
      user: (...args) => pathify(paths.app.user, args)
    },
    binaries: {
      local: (...args) => pathify(paths.binaries.local, args),
      system: (...args) => pathify(paths.binaries.system, args),
      user: (...args) => pathify(paths.binaries.user, args)
    },
    config: {
      local: (...args) => pathify(paths.config.local, args),
      system: (...args) => pathify(paths.config.system, args),
      user: (...args) => pathify(paths.config.user, args)
    },
    home: (...args) => pathify(paths.home, args),
    log: {
      local: (...args) => pathify(paths.log.local, args),
      system: (...args) => pathify(paths.log.system, args),
      user: (...args) => pathify(paths.log.user, args)
    },
    temp: (...args) => pathify(paths.temp, args)
  }
}

module.exports = name => lib(name)
module.exports.use = (name, filesystem, env) => lib(name, filesystem, env)
