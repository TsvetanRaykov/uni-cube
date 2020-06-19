const { Router } = require('express')
const db = require('../controllers/database')
const { auth } = require('../controllers/user')
const router = Router()

router.get('/', auth, async (req, res) => {
  // const { search, from, to } = req.query

  const cubes = await db.getCubes()

  if (!cubes || cubes.length === 0) {

  }
  res.render('index', {
    title: 'Cube Workshop',
    cubes: cubes,
    isLoggedIn: req.isAuth
  })
})

router.get('/about', auth, (req, res) => {
  res.render('about', {
    title: 'About Cube',
    isLoggedIn: req.isAuth
  })
})

module.exports = router
