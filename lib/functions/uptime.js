
const exec = require('../util/exec')

function uptime() {

    return exec('uptime').then((uptime) => uptime.trim())

}

uptime.description = 'Display server uptime'

module.exports = uptime


