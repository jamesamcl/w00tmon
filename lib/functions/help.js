
const exec = require('../util/exec')

function help() {

    const functions = require('./index')

    const res = []

    Object.keys(functions).forEach((functionName) => {

        const fn = functions[functionName]

        res.push(functionName + ': ' + fn.description)

    })

    return Promise.resolve(res.join('\n'))

}

help.description = ''

module.exports = help


