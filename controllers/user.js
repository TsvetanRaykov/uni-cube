const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const saveUser = async (req, res) => {
  const { username, password } = req.body

  const passHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    password: passHash
  })

  const newUser = await user.save()

  const token = generateToken({
    userId: newUser._id,
    username: newUser.username
  })

  res.cookie('aid', token)

  return res.redirect('/')
}

const loginUser = async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username }).lean()

  const status = bcrypt.compareSync(password, user.password)

  if (status) {
    const token = generateToken({
      userId: user._id,
      username: user.username
    })

    res.cookie('aid', token)
    return res.redirect('/')
  }

  return res.redirect('/login')
}

const authAccess = (req, res, next) => {
  auth(req, res, () => {
    if (req.isAuth) { return next() }
    return res.redirect('/login')
  })
}

const authAccessJSON = (req, res, next) => {
  auth(req, res, () => {
    if (req.isAuth) { return next() }
    return res.json({
      error: 'Not authenticated!'
    })
  })
}

const guestAccess = (req, res, next) => {
  auth(req, res, () => {
    if (req.isAuth) { return res.redirect('/') }
    return next()
  })
}

function auth (req, res, next) {
  let isAuth = false
  if (req.cookies && req.cookies.aid) {
    const token = req.cookies.aid
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      if (decoded) {
        isAuth = true
      }
    } catch (e) {
      // ignored
    }
  }
  req.isAuth = isAuth
  return next()
}

function generateToken (data) {
  return jwt.sign(data, process.env.JWT_SECRET)
}

module.exports = {
  saveUser,
  loginUser,
  authAccess,
  authAccessJSON,
  guestAccess,
  auth
}
