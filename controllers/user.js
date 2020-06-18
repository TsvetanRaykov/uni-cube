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

const checkAuthentication = (req, res, next) => {
  const token = req.cookie.aid
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (decoded) {
      return next()
    }
  } catch (e) {
    console.log('Authentication fail:', e)
  }
  return req.redirect('/')
}

function generateToken (data) {
  return jwt.sign(data, process.env.JWT_SECRET)
}

module.exports = {
  saveUser,
  loginUser
}
