const Cube = require('../models/cube')

const getCubes = async () => {
  const cubes = await Cube.find({}).lean()
  return cubes
}

const saveCube = async (cube) => {
  return await cube.save()
}

const getCube = async (id) => {
  const cube = await Cube.findById(id).populate('accessories').lean()
  return cube
}

const createAccessory = async (accessory) => {
  return await accessory.save()
}

module.exports = {
  getCube,
  saveCube,
  getCubes,
  createAccessory
}
