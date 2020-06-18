
const { Router } = require('express')
const db = require('../controllers/database')
const Cube = require('../models/cube')
const jwt = require('jsonwebtoken')
const router = Router()

router.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create Cube'
  })
})

router.post('/create', async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body

  const token = req.cookies.aid

  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  const cube = new Cube({ name, description, imageUrl, difficulty: difficultyLevel, creatorId: decoded.userId })
  await db.saveCube(cube)
  res.redirect('/')
})

router.get('/edit/:id', (req, res) => {
  res.render('editCube', { title: 'Edit cube' })
})

router.get('/delete/:id', (req, res) => {
  res.render('deleteCube', { title: 'Delete cube' })
})

router.get('/details/:id', async (req, res) => {
  const cube = await db.getCube(req.params.id)
  res.render('details', {
    title: 'Cube Details',
    ...cube
  })
})

module.exports = router
