const mongoose = require('mongoose')

const cubeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: [/^[A-Za-z0-9]+$/, 'Name is not valid'],
    minlength: 5
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000,
    match: [/^[A-Za-z0-9]+$/, 'Description is not valid'],
    minlength: 20
  },
  imageUrl: {
    type: String,
    required: true
  },
  difficulty: {
    type: Number,
    required: true,
    min: 1,
    max: 6
  },
  accessories: [
    {
      type: 'ObjectId',
      ref: 'Accessory'
    }
  ],
  creatorId: {
    type: 'ObjectId',
    ref: 'User'
  }
})

cubeSchema.path('imageUrl').validate(function (url) {
  return url.startsWith('http') || url.startsWith('https')
}, 'Image url is not valid!')

module.exports = mongoose.model('Cube', cubeSchema)
