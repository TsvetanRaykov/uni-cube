const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const saveUser = async (req, res) => {
  const { username, password } = req.body

  const passHash = await bcrypt.hash(password, 10)

  const user = new User({
    username, password: passHash
  })

  const newUser = await user.save()

  const token = jwt.sign({
    userId: newUser._id,
    username: newUser.username
  }, 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING')

  res.cookie('aid', token)

  res.redirect('/')
}

module.exports = {
  saveUser
}
