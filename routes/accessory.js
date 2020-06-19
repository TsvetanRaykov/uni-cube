
const { Router } = require('express')
const db = require('../controllers/database')
const Cube = require('../models/cube')
const Accessory = require('../models/accessory')
const { authAccess, authAccessJSON } = require('../controllers/user')
const router = Router()

router.get('/attach/accessory/:id', authAccess, async (req, res) => {
  const { id } = req.params
  const cube = await db.getCube(id)
  const accessories = await Accessory.find({
    _id: {
      $nin: cube.accessories
    }
  }).lean()

  res.render('attachAccessory', {
    title: 'Attach Accessory',
    ...cube,
    accessories,
    isLoggedIn: req.isAuth
  })
})

router.post('/attach/accessory', authAccessJSON, async (req, res) => {
  const { id, accessory } = req.body
  await Cube.updateOne({ _id: id }, {
    $push: {
      accessories: accessory
    }
  })

  res.redirect(`/attach/accessory/${id}`)
})

router.get('/create/accessory', authAccess, (req, res) => {
  res.render('createAccessory', {
    title: 'Create Accessory',
    isLoggedIn: req.isAuth
  })
})

router.post('/create/accessory', authAccessJSON, async (req, res) => {
  const { name, description, imageUrl } = req.body
  const accessory = new Accessory({ name, description, imageUrl })
  try {
    await db.createAccessory(accessory)
    res.redirect('/')
  } catch (err) {
    console.error(err)
    res.redirect('/create/accessory')
  }
})

module.exports = router
