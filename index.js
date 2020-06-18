require('dotenv').config()

const env = process.env.NODE_ENV || 'development'

const config = require('./config/config')[env]
const indexRouter = require('./routes')
const authRouter = require('./routes/auth')
const cubeRouter = require('./routes/cube')
const accessoryRouter = require('./routes/accessory')

const app = require('express')()

require('./config/express')(app)

require('./config/database')

app.use('/', indexRouter)
app.use('/', cubeRouter)
app.use('/', accessoryRouter)
app.use('/', authRouter)

app.all('*', (req, res) => {
  res.render('404', {
    title: 'Error | Cube not found'
  })
})

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`))
