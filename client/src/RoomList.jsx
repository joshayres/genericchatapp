import React, { useState, useEffect } from 'react';
import axios from 'axios';

let RoomList = (props) => {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get(`/server/${props.currentServer}`)
      .then(server => {
        setRooms(server.data.rooms);
      })
  }, [props.currentServer])

  return (
    <div>
      {rooms.map(room => {
        return (
          <div>
            <a onClick={() => {
              props.setCurrentRoom(room)
            }}>{room}</a>
          </div>
        )
      })}
    </div>
  )
}

export default RoomList;