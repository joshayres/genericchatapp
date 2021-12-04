import React, { useState } from 'react';
import axios from 'axios';

let JoinServer = (props) => {

  const [serverName, setServerName] = useState('');

  let joinServer = (e) => {
    e.preventDefault();
    axios.patch(`/server/${serverName}`, {email: props.user.email})
  }

  return (
    <form>
      <input type='text' value={serverName} onChange={(e) => setServerName(e.target.value)} />
      <button type='submit' className='btn btn-secondary m-3' onClick={joinServer}>Join Server</button>
    </form>
  )
}

export default JoinServer;