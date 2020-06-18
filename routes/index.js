const { Router } = require('express')
const db = require('../controllers/database')
const router = Router()

router.get('/', async (req, res) => {
  // const { search, from, to } = req.query

  const cubes = await db.getCubes()

  if (!cubes || cubes.length === 0) {

  }
  res.render('index', {
    title: 'Cube Workshop',
    cubes: cubes
  })
})

router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Cube'
  })
})

module.exports = router
