module.exports = (name, filesystem, env) => {
  const debug = require('debug')('common-locations')

  if (env) debug('using custom env')
  if (filesystem) debug('using custom filesystem')
  if (name) debug('using custom app name')

  const fs = filesystem || require('fs')
  const os = require('os')
  const merge = require('merge')
  const process = require('process')
  const envs = merge.recursive(true, env || {}, process.env)

  const pathify = require('./pathify')(fs)

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
    lib: {
      local: undefined,
      system: undefined,
      user: undefined
    },
    log: {
      local: undefined,
      system: undefined,
      user: undefined
    },
    temp: pathify(os.tmpdir(), name)
  }

  // TODO: Add support for darwin.
  switch (os.platform()) {
    case "win32":
      // NOTE: On Windows, there's almost no difference between local, system,
      // and user because everything lives in "Program Files". We only make a
      // distinction for configuration and log data.
      const programs = envs.PROGRAMFILES || envs.ProgramFiles
      paths.app.local = pathify(programs, name)
      paths.app.system = pathify(programs, name)
      paths.app.user = pathify(programs, name)
      paths.binaries.local = pathify(programs, name)
      paths.binaries.system = pathify(programs, name)
      paths.binaries.user = pathify(programs, name)
      paths.config.local = pathify(envs.APPDATA, name, 'config')
      paths.config.system = pathify(envs.ALLUSERSPROFILE, name, 'config')
      paths.config.user = pathify(envs.LOCALAPPDATA, 'config')
      paths.lib.local = pathify(programs, name, 'lib')
      paths.lib.system = pathify(programs, name, 'lib')
      paths.lib.user = pathify(programs, name, 'lib')
      paths.log.local = pathify(paths.app.local, 'logs')
      paths.log.system = pathify(paths.app.system, 'logs')
      paths.log.user = pathify(paths.app.user, 'logs')
      break;

    default:
      // NOTE: We prefer to use the FHS (http://www.pathname.com/fhs/pub/fhs-2.3.html)
      // locations for applications and data.
      // TODO: Should we also support BSD-style locations, like /usr/local?
      paths.app.local = pathify('/opt', name)
      paths.app.system = pathify('/opt', name)
      paths.app.user = pathify(paths.home, name)
      paths.binaries.local = '/opt/local/bin'
      paths.binaries.system = '/bin'
      paths.binaries.user = '/usr/bin'
      paths.config.local = pathify('/etc', name)
      paths.config.system = pathify('/etc', name)
      paths.config.user = pathify(paths.home, '.config', name)
      paths.lib.local = '/usr/lib'
      paths.lib.system = '/lib'
      paths.lib.user = '/usr/lib'
      paths.log.local = pathify('/var/local', name, 'log')
      paths.log.system = pathify('/var', name, 'log')
      paths.log.user = pathify('/var/opt', name, 'log')
      break;
  }

  return require('./api')(paths, pathify)
}