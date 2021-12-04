const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const db = require('./db.js');

app.use(express.static('./client/dist'))

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.join('global');

  socket.on('load', () => {
    db.Message.find()
      .then(messages => {
        io.to(socket.id).emit('load messages', {messages})
      })
  })

  socket.on('room message', ({ content, to, from }) => {
    console.log(content, to, from);
    let message = new db.Message({ from, content, room: to });
    message.save()
      .then(() => {
        io.to(to).emit('message posted', {
          content,
          from
        })
      })
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  })
});



http.listen(3000, () => {
  console.log('Listening on port 3000')
})