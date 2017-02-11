const expect = require('chai').expect
const mocha = require('mocha')

describe('when using common-locations module', () => {
  const appname = 'common-locations'
  const platform = require('./platforms')(appname)
  const vfs = require('./vfs')(appname)

  const locations = require('../lib')
  const common = locations.use(appname, vfs.volume)

  it('should match local program storage', () => expect(common.app.local())
    .equal(platform.app.local))

  it('should match system program storage', () => expect(common.app.system())
    .equal(platform.app.system))

  it('should match user\'s program storage', () => expect(common.app.user())
    .equal(platform.app.user))

  it('should match local binaries storage', () => expect(common.binaries.local())
    .equal(platform.binaries.local))

  it('should match system binaries storage', () => expect(common.binaries.system())
    .equal(platform.binaries.system))

  it('should match user\'s binaries storage', () => expect(common.binaries.user())
    .equal(platform.binaries.user))

  it('should match local config', () => expect(common.config.local())
    .equal(platform.config.local))

  it('should match system config', () => expect(common.config.system())
    .equal(platform.config.system))

  it('should match user\'s config', () => expect(common.config.user())
    .equal(platform.config.user))

  it('should match user\'s home', () => expect(common.home())
    .equal(platform.home))

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

  it('should match temp storage', () => expect(common.temp())
    .equal(platform.temp))

})
