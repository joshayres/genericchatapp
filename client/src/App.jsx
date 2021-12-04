import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react"

import LoginButton from './LoginButton.jsx';
import LogoutButton from './LogoutButton.jsx';

import { io } from 'socket.io-client';

import TextView from './TextView.jsx';
import NewServer from './NewServer.jsx';
import ServerList from './ServerList.jsx';
import JoinServer from './JoinServer.jsx';
import RoomList from './RoomList.jsx';
import NewRoom from './NewRoom.jsx';
import Message from './Message.jsx';

const socket = io();

let App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [currentServer, setCurrentServer] = useState('global');
  const [currentRoom, setCurrentRoom] = useState('default');

  useEffect(() => {
    if (user) {
      socket.emit('load', {
        user
      });
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isAuthenticated) {
    return (
      <div>
        <TextView socket={socket} currentServer={currentServer} currentRoom={currentRoom} />
        <Message socket={socket} currentServer={currentServer} currentRoom={currentRoom} user={user} />
        <br />
        <h4>Server List: </h4>
        <ServerList socket={socket} setCurrentServer={setCurrentServer} />
        <JoinServer user={user} />
        <NewServer socket={socket} user={user} />
        <br />
        <h4>Room List: </h4>
        <RoomList currentServer={currentServer} setCurrentRoom={setCurrentRoom} />
        <NewRoom socket={socket} currentServer={currentServer} />
        <br />
        <LogoutButton />
      </div>
    )
  }
  return (
    <div>
      <LoginButton />
    </div>
  )
}

export default App;