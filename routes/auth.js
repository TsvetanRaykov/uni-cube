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

router.post('/register', async (req, res) => {
  const { error } = await userService.saveUser(req, res)
  if (error) {
    return res.render('register', {
      title: 'Register',
      isLoggedIn: req.isAuth,
      error
    })
  } else {
    return res.redirect('/')
  }
})

router.get('/login', guestAccess, (req, res) => {
  const error = req.query.error ? 'Login failed' : null
  res.render('login', {
    title: 'Login',
    isLoggedIn: req.isAuth,
    error
  })
})

router.post('/login', userService.loginUser)

router.get('/logout', (req, res) => {
  res.clearCookie('aid')
  res.redirect('/')
})

module.exports = router
