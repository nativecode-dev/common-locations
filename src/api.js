module.exports = (paths, pathify) => {
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
    lib: {
      local: (...args) => pathify(paths.lib.local, ...args),
      system: (...args) => pathify(paths.lib.system, ...args),
      user: (...args) => pathify(paths.lib.user, ...args)
    },
    log: {
      local: (...args) => pathify(paths.log.local, ...args),
      system: (...args) => pathify(paths.log.system, ...args),
      user: (...args) => pathify(paths.log.user, ...args)
    },
    temp: (...args) => pathify(paths.temp, ...args)
  }
}
