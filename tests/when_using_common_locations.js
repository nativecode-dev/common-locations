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

const vfs = {
  [dir.etc]: undefined,
  [dir.home]: undefined
}

const volume = new memfs.Volume()
const locations = require('../lib')
const common = locations(volume)

describe('when using common-locations module', () => {
  describe('to access files in the user\'s home directory', () => {
    if (os.platform() === 'win32') {
      const mount = volume.mountSync('C:\\', vfs)

      it('should exist', () => expect(common.home()).to.be.equal(util.format('C:\\%s', dir.home)))
      it('should exist with additional directories', () => expect(common.home(false, 'etc')).to.be.equal(util.format('C:\\%s', dir.etc)))
      it('should create sub-directory', () => expect(common.home(true, 'test')).to.be.equal(util.format('C:\\%s\\test', dir.home)))
      it('should create sub-directory with additional directories', () => expect(common.home(true, 'etc', 'test')).to.be.equal(util.format('C:\\%s\\etc\\test', dir.home)))
    } else {
      const mount = volume.mountSync('/', vfs)

      it('should exist', () => expect(common.home()).to.be.equal(dir.home))
      it('should exist with additional directories', () => expect(common.home(false, 'etc')).to.be.equal(dir.etc))
      it('should create sub-directory', () => expect(common.home(true, 'test')).to.be.equal(dir.home))
      it('should create sub-directory with additional directories', () => expect(common.home(true, 'etc', 'test')).to.be.equal(dir.home))
    }
  })
})
