import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminDashboard from './pages/adminDashboard';
import LoginForm from './pages/loginform';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<AdminDashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
