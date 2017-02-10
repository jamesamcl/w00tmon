
const irc = require('irc')
const os = require('os')
const extend = require('xtend')

const functions = require('./functions/index')

class Client {
    
    constructor() {
    }

    connect(server, nickPrefix, ircOpts) {

        this.nick = nickPrefix + os.hostname()

        ircOpts = extend({

            userName: this.nick,
            realName: 'w00tmon@' + os.hostname()

        }, ircOpts)

        console.log('Server: ' + server)
        console.log('Nick: ' + this.nick)
        console.log('IRC options: ' + JSON.stringify(ircOpts))

        this.irc = new irc.Client(server, nickPrefix + os.hostname(), ircOpts)

        this.irc.addListener('error', this.onIrcError.bind(this))
        this.irc.addListener('join', this.onIrcJoin.bind(this))
        this.irc.addListener('message', this.onIrcMessage.bind(this))
    }

    onIrcJoin(channel, nick, message) {

        this.irc.say(channel, 'w00tmon@' + os.hostname() + ' initialized')

        this.doFunction(channel, functions.uptime)

    }

    onIrcError(error) {

        console.error(error)

    }

    onIrcMessage(from, to, message) {

        message = message.trim()

        const tokens = message.split(/ +/)

        if(tokens[0].toLowerCase().split(':').join('')
                === this.nick.toLowerCase()) {

            this.onCommand(from, to, message, tokens[1], tokens.slice(2))

        }

    }

    onCommand(from, to, message, command, args) {

        if(functions[command] !== undefined) {

            this.doFunction(to, functions[command])
            return

        }

    }

    doFunction(to, func) {

        func().then((res) => {

            this.send(to, res)

        }).catch((err) => {

            this.send(to, err.stack)

        })

    }

    send(to, message) {

        this.irc.say(to, message)

    }


}

module.exports = Client


