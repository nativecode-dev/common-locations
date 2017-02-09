const expect = require('chai').expect
const os = require('os')
const memfs = require('memfs')
const mocha = require('mocha')
const util = require('util')

const username = os.userInfo().username

const dir = {
  etc: os.platform() === 'win32' ? util.format('Users\\%s\\etc', username) : util.format('/home/%s/etc', username),
  home: os.platform() === 'win32' ? util.format('Users\\%s', username) : util.format('/home/%s', username)
}

const locations = require('../lib')
const common = locations.use(require('./vfs').volumne)

describe('when using common-locations module', () => {
  describe('to access files in the user\'s home directory', () => {
    if (os.platform() === 'win32') {
      it('should exist', () => expect(common.home()).to.be.equal(util.format('C:\\%s', dir.home)))
      it('should exist with additional directories', () => expect(common.home('etc')).to.be.equal(util.format('C:\\%s', dir.etc)))
    } else {
      it('should exist', () => expect(common.home()).to.be.equal(dir.home))
      it('should exist with additional directories', () => expect(common.home('etc')).to.be.equal(dir.etc))
    }
  })
})
