const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment')
require('dotenv').config({ path: './variables.env' });

const mongoString = process.env.DB
mongoose.connect(mongoString, {useNewUrlParser: true})
autoIncrement.initialize(mongoose.connection);
//const validator = require('validator');

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  details:{
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    phone:{
      type: String,
      required: true
    }
  }
})

module.exports = mongoose.model('users', UserSchema)