const expect = require('chai').expect
const memfs = require('memfs')
const mocha = require('mocha')

const vfs = {
  'Users\\mpham\\AppData\\Local': undefined,
  'Users\\mpham\\AppData\\Roaming': undefined
}

const volume = new memfs.Volume()
const mount = volume.mountSync('C:\\', vfs)

const locations = require('../lib')
const common = locations(volume)

describe('when using common-locations module', () => {
  describe('to access files in the user\'s home directory', () => {
    it('should exist', () => {
      expect(common.home()).to.be.equal('C:\\Users\\mpham')
    })

    it('should create sub-directory', () => {
      expect(common.home(true, 'test')).to.be.equal('C:\\Users\\mpham\\test')
    })
  })
})
