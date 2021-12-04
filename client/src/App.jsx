import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react"

import LoginButton from './LoginButton.jsx';
import LogoutButton from './LogoutButton.jsx';

import { io } from 'socket.io-client';

const socket = io();

let App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [content, setContent] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (user) {
      socket.emit('load', {
        user
      });
    }
  }, [user]);

  useEffect(() => {
    socket.on('message posted', (message) => {
      setMessages(messages => [...messages, message]);
    })

    socket.on('load messages', (prevMessages) => {
      console.log(prevMessages);
      setMessages(messages => [...messages, ...prevMessages.messages]);
    })

    return () => socket.disconnect();
  }, []);

  let sendMessage = () => {
    socket.emit('room message', {
      content,
      to: 'global',
      from: user.name
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isAuthenticated) {
    return (
      <div>
        {messages.map(mes => {
          console.log(mes);
          return (
            <div>
              <p>{mes.from}</p>
              <p>{mes.content}</p>
            </div>
          )
        })}
        <input type='text' name='input' value={content} onChange={(e) => { setContent(e.target.value) }} />
        <button onClick={sendMessage}>Post</button>
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