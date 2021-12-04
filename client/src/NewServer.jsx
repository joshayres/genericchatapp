import React, { useState, useEffect } from 'react';

let NewServer = (props) => {

  const [serverName, setServerName] = useState('');

  let createServer = () => {
    props.socket.emit('new server', {
      name: serverName,
      user: props.user.email
    })
  }

  return (
    <div>
      <input type='text' value={serverName} onChange={(e) => setServerName(e.target.value)} />
      <button onClick={createServer}>Create Server</button>
    </div>
  )
}

export default NewServer;