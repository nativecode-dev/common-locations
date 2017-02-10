const path = require('path')

module.exports = fs => {
  return (directory, ...args) => {
    let current = directory

    args.forEach(arg => {
      current = path.join(current, arg)
    })

    return current
  }
}
