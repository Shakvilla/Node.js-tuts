const ProgressBar = require('progress')


const consoleBar = new ProgressBar(':consoleBar', { total: 10 })
const timer = setInterval(() => {
    consoleBar.tick()
    if (consoleBar.complete) {

        clearInterval(timer)
    }
}, 100)