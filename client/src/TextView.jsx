import React, { useState, useEffect } from 'react';

let TextView = (props) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    props.socket.on('message posted', (message) => {
      setMessages(messages => [...messages, message]);
    })

    props.socket.on('load messages', (prevMessages) => {
      setMessages(messages => [...messages, ...prevMessages.messages]);
    })

  }, []);

  return (
    <div>
      <h2>Server Name: {props.currentServer}</h2>
      <h3>Room Name: {props.currentRoom}</h3>
      {messages.map(mes => {
        if (mes.room === props.currentServer + props.currentRoom) {
          return (
            <div>
              <p>{mes.from}</p>
              <p>{mes.content}</p>
            </div>
          )
        }

      })}
    </div>
  )
}

export default TextView;