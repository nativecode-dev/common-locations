const path = require('path')

module.exports = fs => {
  return (directory, ...args) => {
    let current = directory
    // TODO: make directories if they don't exist, one by one.
    args.forEach(arg => {
      current = path.join(current, arg)

      if (!fs.memfs && !fs.existsSync(current)) {
        fs.mkdirSync(current)
      }
    })

    return current
  }
}
