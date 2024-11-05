import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../services/api';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const usersData = await fetchUsers();
                setUsers(usersData);
            } catch (error) {
                console.error("Failed to load users:", error);
            }
        };
        loadUsers();
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.name} - {user.role}</li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
