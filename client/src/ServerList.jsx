import React, { useState, useEffect } from 'react';

let ServerList = (props) => {

  const [servers, setServers] = useState([])

  useEffect(() => {
    if (props.user) {
      props.socket.on('join servers', (serverList) => {
        setServers(serverList);
      })
    }
  }, [props.user])

  return (
    <div>
      {servers.map(server => {
        return (
          <div>
            <a onClick={() => {
              // console.log(server.name);
              props.setCurrentServer(server.name);
              props.setCurrentRoom('default');
            }}>{server.name}</a>
            <br />
          </div>
        )
      })}
    </div>
  )
}

export default ServerList;