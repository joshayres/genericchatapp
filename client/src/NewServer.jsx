import React, { useState, useEffect } from 'react';

let NewServer = (props) => {

  const [serverName, setServerName] = useState('');

  let createServer = (e) => {
    e.preventDefault();
    props.socket.emit('new server', {
      name: serverName,
      user: props.user.email
    })
  }

  return (
    <form>
      <input className='form-text' type='text' value={serverName} onChange={(e) => setServerName(e.target.value)} />
      <button type='submit' className='btn btn-primary m-3' onClick={createServer}>Create Server</button>
    </form>
  )
}

export default NewServer;