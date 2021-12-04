import React, { useState, useEffect } from 'react';

let ServerList = (props) => {

  const [servers, setServers] = useState([])

  useEffect(() => {
    props.socket.on('join servers', (serverList) => {
      setServers(serverList);
    })
  }, [])

  return (
    <div>
      {servers.map(server => {
        return <p>{server.name}</p>
      })}
    </div>
  )
}

export default ServerList;