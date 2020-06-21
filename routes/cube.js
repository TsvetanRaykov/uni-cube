const { Router } = require('express')
const db = require('../controllers/database')
const { authAccess, authAccessJSON, auth } = require('../controllers/user')
const Cube = require('../models/cube')
const jwt = require('jsonwebtoken')
const router = Router()

router.get('/create', authAccess, (req, res) => {
  res.render('create', {
    title: 'Create Cube',
    isLoggedIn: req.isAuth
  })
})

router.post('/create', authAccessJSON, async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body

  const token = req.cookies.aid
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  try {
    const cube = new Cube({
      name,
      description,
      imageUrl,
      difficulty: difficultyLevel,
      creatorId: decoded.userId
    })
    await db.saveCube(cube)
    res.redirect('/')
  } catch (error) {
    res.render('create', {
      title: 'Create Cube',
      isLoggedIn: req.isAuth,
      error
    })
  }
})

router.get('/edit/:id', authAccess, async (req, res) => {
  const cube = await db.getCube(req.params.id)
  res.render('editCube', {
    title: 'Edit cube',
    isLoggedIn: req.isAuth,
    ...cube
  })
})

router.post('/update', (req, res) => {
  const { name, description, imageUrl, difficultyLevel, id } = req.body
  Cube.updateOne({ _id: id }, {
    name, description, imageUrl, difficulty: difficultyLevel
  }, (err) => {
    if (err) { console.log(err) } else { res.redirect('/') }
  })
})

router.get('/delete/:id', authAccess, async (req, res) => {
  const cube = await db.getCube(req.params.id)
  res.render('deleteCube', {
    title: 'Delete cube',
    isLoggedIn: req.isAuth,
    ...cube
  })
})

router.post('/delete', (req, res) => {
  Cube.deleteOne({ _id: req.body.id }, (err) => {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/')
    }
  })
})

router.get('/details/:id', auth, async (req, res) => {
  const cube = await db.getCube(req.params.id)
  res.render('details', {
    title: 'Cube Details',
    isLoggedIn: req.isAuth,
    ...cube
  })
})

module.exports = router
