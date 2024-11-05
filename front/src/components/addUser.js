import React, { useState } from 'react';
import { createUser } from '../services/api';

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, email };
    try {
      await createUser(newUser);
      setStatus('User added successfully!');
      setName('');
      setEmail('');
    } catch (error) {
      setStatus('Error adding user.');
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      {status && <p>{status}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
