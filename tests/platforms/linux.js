const userinfo = require('common-userinfo')
const util = require('util')

const username = userinfo.username

module.exports = name => {
  return {
    app: {
      local: util.format('/opt/%s', name),
      system: util.format('/opt/%s', name),
      user: util.format('/home/%s/%s', username, name)
    },
    bin: {
      local: '/opt/local/bin',
      system: '/bin',
      user: '/usr/bin'
    },
    config: {
      local: util.format('/etc/%s', name),
      system: util.format('/etc/%s', name),
      user: util.format('/home/%s/%s', username, name)
    },
    home: util.format('/home/%s', username),
    lib: {
      local: '/usr/lib',
      system: '/lib',
      user: '/usr/lib'
    },
    log: {
      local: util.format('/var/local/%s/log', name),
      system: util.format('/var/%s/log', name),
      user: util.format('/var/opt/%s/log', name)
    },
    temp: util.format('/tmp/%s', name)
  }
}
