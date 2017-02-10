const expect = require('chai').expect
const mocha = require('mocha')

describe('when using common-locations module', () => {
  const memfs = require('memfs')
  const os = require('os')
  const path = require('path')
  const util = require('util')
  const vfs = require('./vfs')

  const username = os.userInfo().username

  const dir = {
    etc: os.platform() === 'win32' ?
      util.format('Users\\%s\\etc', username) : util.format('/home/%s/etc', username),
    home: os.platform() === 'win32' ?
      util.format('Users\\%s', username) : util.format('/home/%s', username)
  }

  const locations = require('../lib')
  const common = locations.use('test', vfs.volume)

  describe('to access files in the user\'s home directory', () => {
    if (os.platform() === 'win32') {

      it('should exist', () => expect(common.home())
        .to.be.equal(path.join('C:\\', dir.home)))

      it('should exist with additional parts', () => expect(common.home('etc', 'test'))
        .to.be.equal(path.join('C:\\', dir.etc, 'test')))

    } else {

      it('should exist', () => expect(common.home())
        .to.be.equal(dir.home))

      it('should exist with additional parts', () => expect(common.home('etc', 'test'))
        .to.be.equal(path.join(dir.etc, 'test')))

    }
  })
})
