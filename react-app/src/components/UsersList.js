import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './UsersList.css'

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.map((user) => {
    return (
      <li className='users-list-container' key={user.id}>
        <div className='user-first-last-name'>{user.first_name} {user.last_name}</div>-
        <NavLink className='NavButton' to={`/users/${user.id}`}>{user.username}</NavLink>
      </li>
    );
  });

  return (
    <div className='user-page-container'>
      <h1>All Users</h1>
      <ul className ='users' >{userComponents}</ul>
    </div>
  );
}

export default UsersList;
