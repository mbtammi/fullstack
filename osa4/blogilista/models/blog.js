const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  user: {
    //Muistiinpanojen id:t on talletettu käyttäjien sisälle taulukkona Mongo-id:itä    
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)