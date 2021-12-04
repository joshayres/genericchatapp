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
            <div className='border-bottom border-dark m-1'>
              <p className='fs-6' >{mes.from}</p>
              <p className='fs-5' style={{
                marginTop: '-1em'
              }} >{mes.content}</p>
            </div>
          )
        }

      })}
    </div>
  )
}

export default TextView;