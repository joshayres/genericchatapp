import React, { useState } from 'react';
import axios from 'axios';

let JoinServer = (props) => {

  const [serverName, setServerName] = useState('');

  let joinServer = () => {
    axios.patch(`/server/${serverName}`, {email: props.user.email})
  }

  return (
    <div>
      <input type='text' value={serverName} onChange={(e) => setServerName(e.target.value)} />
      <button onClick={joinServer}>Join Server</button>
    </div>
  )
}

export default JoinServer;