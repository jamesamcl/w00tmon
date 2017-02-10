
const config = require('./config.json')

const Client = require('./lib/Client')

const client = new Client()

client.connect(config.irc.server, config.irc.nickPrefix, config.irc)




