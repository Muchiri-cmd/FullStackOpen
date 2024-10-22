const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required:[true,'Username is required'],
    unique: true,
    minlength: [3,'Username must be atleast 3 characters long']
  },
  name:String,
  passwordHash:{
    type:String,
    required:true
  },
  blogs: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Blog'
    }
  ]
})
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
    delete returnedObject.passwordHash // should be concealed
  }
})

const User = mongoose.model('User',userSchema)

module.exports = User