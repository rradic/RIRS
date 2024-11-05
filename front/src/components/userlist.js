import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../services/api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        setError('Failed to load users.');
      }
    };

    loadUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
