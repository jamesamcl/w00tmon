
const exec = require('child-process-promise').exec

function runCommand(cmd, args) {

    return exec(cmd, args || []).then((res) => res.stdout)

}

module.exports = runCommand

