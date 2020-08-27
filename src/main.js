'use strict'

const ExpressServer = require('./express-server')

const PORT_DEFAULT = 8080
const server = new ExpressServer()

server.start(process.env.PORT || PORT_DEFAULT)