const env = process.env.NODE_ENV || 'development'
const config = require('./config')[env]

const mongoose = require('mongoose')

mongoose.connect(config.databaseUrl,
  { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
      throw err
    }
    console.log('DB is connected')
  })

module.exports = mongoose
