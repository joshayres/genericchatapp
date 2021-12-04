const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const db = require('./db.js');

app.use(express.static('./client/dist'))

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('load', (userData) => {
    db.User.findOne({ email: userData.user.email })
      .then(user => {
        if (!user) {
          let newUser = new db.User({ email: userData.user.email, name: userData.user.name, servers: ['global'] });
          console.log(newUser);
          newUser.save()
            .then(() => {
              socket.join('global');
              io.to(socket.id).emit('join servers', { servers: [{ name: 'global' }] });
            })
        } else {
          let serverPromises = [];
          user.servers.forEach(server => {
            serverPromises.push(db.Server.findOne({ name: server }))
          })
          Promise.all(serverPromises)
            .then(servers => {
              servers.forEach(server => {
                server.rooms.forEach(room => {
                  socket.join(server.name + room);
                })
              })
              io.to(socket.id).emit('join servers', servers);
            })
        }
      })

    // Send messages for all rooms user is apart of
    db.Message.find()
      .then(messages => {
        io.to(socket.id).emit('load messages', { messages })
      })
  })

  socket.on('new server', ({ name, user }) => {
    let newServer = new db.Server({ name, rooms: ['default'] });
    newServer.save()
      .then(() => {
        db.User.findOne({ email: user })
          .then(u => {
            u.servers.push(name);
            return u.save();
          })
      });
  })

  socket.on('room message', ({ content, to, from, server }) => {
    let message = new db.Message({ from, content, server: server, room: to });
    message.save()
      .then(() => {
        io.to(to).emit('message posted', {
          content,
          from,
          room: to,
          server
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