import React, { useState, useEffect } from 'react';

let NewRoom = (props) => {

  const [roomName, setRoomName] = useState('');

  let newRoom = (e) => {
    e.preventDefault();
    props.socket.emit('new room', {
      server: props.currentServer,
      room: roomName,
      user: props.user
    });
    setRoomName('');
  }

  return (
    <form>
      <input className='form-text' type='text' value={roomName} onChange={(e) => setRoomName(e.target.value)} />
      <button type='submit' className='btn btn-primary m-3' onClick={newRoom}>Create New Room</button>
    </form>
  )
}

export default NewRoom;