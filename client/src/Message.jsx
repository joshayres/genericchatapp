import React, { useState } from 'react';

let Message = (props) => {

  const [content, setContent] = useState('');

  let sendMessage = (e) => {
    e.preventDefault();
    props.socket.emit('room message', {
      content,
      to: props.currentServer + props.currentRoom,
      from: props.user.name,
      server: props.currentServer
    })
    setContent('');
  }

  return (
    <form>
        <input type='text' name='input' value={content} onChange={(e) => { setContent(e.target.value) }} />
        <button type='submit' onClick={sendMessage}>Post</button>
    </form>
  )
}

export default Message;