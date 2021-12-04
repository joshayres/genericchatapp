const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/rouge')
  .then(console.log('connect to db'))
  .catch(err => console.error(err));

const messageSchema = new mongoose.Schema({
  from: String,
  server: String,
  room: String,
  content: String
})

const serverSchema = new mongoose.Schema({
  name: String,
  rooms: Array
})

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  servers: Array
})

const Message = mongoose.model('Message', messageSchema);
const Server = mongoose.model('Server', serverSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
  Message,
  Server,
  User
};