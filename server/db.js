const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/rouge')
  .then(console.log('connect to db'))
  .catch(err => console.error(err));

const messageSchema = new mongoose.Schema({
  from: String,
  room: String,
  content: String
})

const Message = mongoose.model('Message', messageSchema);

module.exports = {
  Message
};