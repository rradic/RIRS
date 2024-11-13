import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminDashboard from './pages/adminDashboard';
import LoginForm from './pages/loginform';
import ManagerDashboardLayout from "./layout/ManagerDashboardLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<AdminDashboard/>} />
        <Route path="/manager" element={<ManagerDashboardLayout/>} />
      </Routes>
    </Router>
  );
}

export default App;
