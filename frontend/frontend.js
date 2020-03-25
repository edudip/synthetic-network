'use strict'
module.exports = {
    startCLI: startFrontendCLI,
    start: startFrontend
}

const express = require('express')
const fs = require('fs')

function startFrontendCLI(argv) {
    const specpath = process.argv[2]
    const rushpid = parseInt(process.argv[3], 10)
    var port = parseInt(process.argv[4], 10)
    if (isNaN(port)) port = undefined
    startFrontend(specpath, rushpid, port)
}

function startFrontend(specpath, rushpid, port) {
    if (port == undefined) port = 8080

    const app = express()

    app.use(express.json())
    app.use(express.static('client'))

    app.get('/', (req, res) => {
        res.redirect('/control.html')
    })

    app.get('/qos', (req, res) => {
        // Respond with current conf
        fs.readFile(specpath, 'utf8', (err, str) => {
            if (err) throw err
            res.json(JSON.parse(str))
        })
    })

    app.post('/qos', (req, res) => {
        const conf = req.body
        // write conf to confpath
        fs.writeFile(specpath, JSON.stringify(conf), (err) => {
            if (err) throw err
            // send SIGHUP to rush pid
            process.kill(rushpid, 'SIGHUP')
            // signal OK
            res.send('OK')
        })
    })

    return new Promise(resolve => {
        const server = app.listen(port, () => {
            console.log(`Listening on port ${port}!`)
            resolve(server)
        })
    })
}
