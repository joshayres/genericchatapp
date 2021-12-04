import React, { useState, useEffect } from 'react';
import axios from 'axios';

let UserList = (props) => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`/server/${props.currentServer}/users`)
      .then(userList => {
        setUsers(userList.data);
      })
  }, [props.currentServer])

  return (
    <div>
      <h3>Users</h3>
      {users && users.map(user => {
        return <p>{user.name}</p>
      })}
    </div>
  )
}

export default UserList;