const express = require('express')
const handlebars = require('express-handlebars')
const handlebarsHelpers = require('./handlebars-helpers')
const cookies = require('cookie-parser')

module.exports = (app) => {
  app.use(cookies())

  app.use(express.json())
  app.use(express.urlencoded({
    extended: false
  }))

  app.engine('.hbs', handlebars({
    extname: '.hbs',
    helpers: handlebarsHelpers
  }))

  app.set('view engine', '.hbs')

  app.use(express.static('static'))
  app.use(express.urlencoded({ extended: true }))
}
