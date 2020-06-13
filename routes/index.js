const { Router } = require('express')
const db = require('../controllers/database')
const Cube = require('../models/cube')
const Accessory = require('../models/accessory')
const router = Router()

router.get('/', async (req, res) => {
  const { search, from, to } = req.query

  const cubes = await db.getCubes()

  if (!cubes || cubes.length === 0) {

  }
  res.render('index', {
    title: 'Cube Workshop',
    cubes: cubes
  })
  // db.getCubes().then(cubes => {
  //     if (!cubes || cubes.length === 0) {
  //       return []
  //     }
  //     let filteredSearch = cubes.slice(0)
  //     if (search) {
  //       filteredSearch = filteredSearch.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
  //     }

  //     filteredSearch = filteredSearch.slice(0).filter(c => (+c.difficulty >= (+from || 1)) && (+c.difficulty <= (+to || 10)))

//     res.render('index', {
//       title: 'Cube Workshop',
//       cubes: filteredSearch
//     })
//   })
})

router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Cube'
  })
})

router.get('/details/:id', async (req, res) => {
  const cube = await db.getCube(req.params.id)
  res.render('details', {
    title: 'Cube Details',
    ...cube
  })
})

router.get('/attach/accessory/:id', async (req, res) => {
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
    accessories
  })
})

router.post('/attach/accessory', async (req, res) => {
  const { id, accessory } = req.body
  await Cube.updateOne({ _id: id }, {
    $push: {
      accessories: accessory
    }
  })

  res.redirect(`/attach/accessory/${id}`)
})

router.get('/create/accessory', (req, res) => {
  res.render('createAccessory', {
    title: 'Create Accessory'
  })
})

router.post('/create/accessory', async (req, res) => {
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

router.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create Cube'
  })
})

router.post('/create', async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body
  const cube = new Cube({ name, description, imageUrl, difficulty: difficultyLevel })
  await db.saveCube(cube)
  res.redirect('/')
})

router.post('/attach/accessory', (req, res) => {

})

router.all('*', (req, res) => {
  res.render('404', {
    title: 'Error | Cube not found'
  })
})

module.exports = router
