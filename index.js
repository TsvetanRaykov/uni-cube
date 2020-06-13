// require('dotenv').config()

const env = process.env.NODE_ENV || 'development'

const config = require('./config/config')[env]
const indexRouter = require('./routes')
const app = require('express')()

require('./config/express')(app)

require('./config/database')

app.use('/', indexRouter)

app.listen(80, console.log(`Listening on port ${process.env.PORT}! Now its up to you...`))
