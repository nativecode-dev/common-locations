const locations = require('./locations')

module.exports = name => locations(name)
module.exports.use = (name, filesystem, env) => locations(name, filesystem, env)
