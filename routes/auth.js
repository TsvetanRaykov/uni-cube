const express = require('express')

const userService = require('../controllers/user')
const { guestAccess } = require('../controllers/user')

const router = express.Router()

router.get('/register', guestAccess, (req, res) => {
  res.render('register', {
    title: 'Register',
    isLoggedIn: req.isAuth
  })
})

router.post('/register', userService.saveUser)

router.get('/login', guestAccess, (req, res) => {
  res.render('login', {
    title: 'Login',
    isLoggedIn: req.isAuth
  })
})

router.post('/login', userService.loginUser)

router.get('/logout', (req, res) => {
  res.clearCookie('aid')
  res.redirect('/')
})

module.exports = router
