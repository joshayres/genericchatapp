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
        <input className='form-text' type='text' name='input' value={content} onChange={(e) => { setContent(e.target.value) }} />
        <button className='btn btn-success m-3' type='submit' onClick={sendMessage}>Post</button>
    </form>
  )
}

export default Message;