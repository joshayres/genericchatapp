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


const socket = io();

let App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [content, setContent] = useState('');
  const [currentServer, setCurrentServer] = useState('global');
  const [currentRoom, setCurrentRoom] = useState('default');

  useEffect(() => {
    if (user) {
      socket.emit('load', {
        user
      });
    }
  }, [user]);

  let sendMessage = () => {
    socket.emit('room message', {
      content,
      to: currentServer + currentRoom,
      from: user.name,
      server: currentServer
    })
    setContent('');
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isAuthenticated) {
    return (
      <div>
        <TextView socket={socket} currentServer={currentServer} currentRoom={currentRoom} />
        <input type='text' name='input' value={content} onChange={(e) => { setContent(e.target.value) }} />
        <button onClick={sendMessage}>Post</button>
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