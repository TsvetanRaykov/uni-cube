const express = require('express')

const userService = require('../controllers/user')

const router = express.Router()

router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Register'
  })
})

router.post('/register', userService.saveUser)

router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login'
  })
})
router.get('/logout', (req, res) => {})

module.exports = router
