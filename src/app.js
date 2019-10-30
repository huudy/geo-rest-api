const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const geoInfoRouter = require('./routers/geoInfo')
const dbState = require('./middleware/dbState')
var log4js = require('log4js');
log4js.configure('./config/log4js.json');

var log = log4js.getLogger("app");


const app = express()

app.use(log4js.connectLogger(log4js.getLogger("http"), {
    level: 'auto'
}));
log.info('Setting up the application...')
app.use(dbState)
app.use(express.json())
app.use(userRouter)
app.use(geoInfoRouter)

module.exports = app