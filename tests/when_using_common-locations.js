const expect = require('chai').expect
const mocha = require('mocha')

describe('when using common-locations module', () => {
  const appname = 'common-locations'
  const platform = new require('./platforms')(appname)
  const vfs = require('./vfs')(appname)

  const Platform = require('../lib').Platform
  const common = new Platform(appname)

  it('should match local program storage', () => expect(common.app.local())
    .equal(platform.app.local))

  it('should match system program storage', () => expect(common.app.system())
    .equal(platform.app.system))

  it('should match user\'s program storage', () => expect(common.app.user())
    .equal(platform.app.user))

  it('should match local bin storage', () => expect(common.bin.local())
    .equal(platform.bin.local))

  it('should match system bin storage', () => expect(common.bin.system())
    .equal(platform.bin.system))

  it('should match user\'s bin storage', () => expect(common.bin.user())
    .equal(platform.bin.user))

  it('should match local config', () => expect(common.config.local())
    .equal(platform.config.local))

  it('should match system config', () => expect(common.config.system())
    .equal(platform.config.system))

  it('should match user\'s config', () => expect(common.config.user())
    .equal(platform.config.user))

  it('should match local lib storage', () => expect(common.lib.local())
    .equal(platform.lib.local))

  it('should match system lib storage', () => expect(common.lib.system())
    .equal(platform.lib.system))

  it('should match user\'s lib storage', () => expect(common.lib.user())
    .equal(platform.lib.user))

  it('should match local log storage', () => expect(common.log.local())
    .equal(platform.log.local))

  it('should match system log storage', () => expect(common.log.system())
    .equal(platform.log.system))

  it('should match user\'s log storage', () => expect(common.log.user())
    .equal(platform.log.user))

})
