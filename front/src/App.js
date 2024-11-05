import React from 'react';
import UserList from './components/userlist';
import AddUser from './components/addUser';

function App() {
  return (
    <div>
      <h1>Manage Users</h1>
      <AddUser />
      <UserList />
    </div>
  );
}

export default App;
