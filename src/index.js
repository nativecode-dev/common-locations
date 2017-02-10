const lib = require('./locations')
module.exports = name => lib(name)
module.exports.use = (name, filesystem, env) => lib(name, filesystem, env)
