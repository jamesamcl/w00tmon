
const commands = Object.create(null)

commands.help = require('./help')
commands.uptime = require('./uptime')

module.exports = commands

