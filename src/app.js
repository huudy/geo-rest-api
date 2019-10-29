const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const geoInfoRouter = require('./routers/geoInfo')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(geoInfoRouter)

module.exports = app