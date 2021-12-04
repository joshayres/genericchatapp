import React, { useState, useEffect } from 'react';

let NewRoom = (props) => {

  const [roomName, setRoomName] = useState('');

  let newRoom = () => {
    props.socket.emit('new room', {
      server: props.currentServer,
      room: roomName
    })
  }

  return (
    <div>
      <input type='text' value={roomName} onChange={(e) => setRoomName(e.target.value)} />
      <button onClick={newRoom}>Create New Room</button>
    </div>
  )
}

export default NewRoom;