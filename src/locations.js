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
    case 'darwin':
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

    case "win32":
      // NOTE: On Windows, there's almost no difference between local, system,
      // and user because everything lives in "Program Files". We only make a
      // distinction for configuration and log data.
      paths.app.local = pathify(envs.LOCALAPPDATA, name)
      paths.app.system = pathify(envs.ALLUSERSPROFILE, name)
      paths.app.user = pathify(envs.APPDATA, name)

      paths.binaries.local = pathify(envs.LOCALAPPDATA, name, 'bin')
      paths.binaries.system = pathify(envs.ALLUSERSPROFILE, name, 'bin')
      paths.binaries.user = pathify(envs.APPDATA, name, 'bin')

      paths.config.local = pathify(envs.LOCALAPPDATA, name, 'config')
      paths.config.system = pathify(envs.ALLUSERSPROFILE, name, 'config')
      paths.config.user = pathify(envs.APPDATA, name, 'config')

      paths.lib.local = pathify(envs.LOCALAPPDATA, name, 'lib')
      paths.lib.system = pathify(envs.ALLUSERSPROFILE, name, 'lib')
      paths.lib.user = pathify(envs.APPDATA, name, 'lib')

      paths.log.local = pathify(envs.LOCALAPPDATA, name, 'logs')
      paths.log.system = pathify(envs.ALLUSERSPROFILE, name, 'logs')
      paths.log.user = pathify(envs.APPDATA, name, 'logs')
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
