const mongoose = require('mongoose')

const accessorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  cubes: [{
    type: 'ObjectId',
    ref: 'Cube'
  }]
})

accessorySchema.path('imageUrl').validate(function (url) {
  return url.startsWith('http') || url.startsWith('https')
}, 'Image url is not valid!')

module.exports = mongoose.model('Accessory', accessorySchema)
