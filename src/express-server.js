'use strict'

const express = require('express')

function ExpressServer() {

    const app = express()

    const VCAP_APPLICATION = process.env.VCAP_APPLICATION
    const VCAP_SERVICES = process.env.VCAP_SERVICES

    app.get('/', function (req, res) {
        if (VCAP_APPLICATION) {
            const vcapApplication = JSON.parse(VCAP_APPLICATION)
            const vcapService = JSON.parse(VCAP_SERVICES)
            res.send(`<h1>Dummy App (nodejs)</h1>
<p>This is a dummy app written in NodeJs and deployed in CloudFoundry in the org "${vcapApplication.organization_name}" in space "${vcapApplication.space_name}".</p>
<h3>VCAP_APPLICATION</h3>
<pre>${JSON.stringify(vcapApplication,null, 4)}</pre>
<h3>VCAP_SERVICES</h3>
<pre>${JSON.stringify(vcapService,null, 4)}</pre>`)
        } 

        res.send(`<h1>Dummy App (nodejs)</h1>
<p>This is a dummy app written in NodeJs and not deployed in CloudFoundry</p>`)
    })

    app.get('/health', function (req, res) {
        res.send("Healthy")
    })

    this.start = function (port) {
        app.listen(port).on('error', function (error) {
            console.error(`Failed to start server at port ${port}, port might be in use.`)
            console.error(error.stack)
            process.exit(2)
        })
        console.log(`Server started on port ${port}`)
    }
}

module.exports = ExpressServer