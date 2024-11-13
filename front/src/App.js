import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AdminDashboard from "./pages/adminDashboard";
import LoginForm from "./pages/loginform";
import EmployeeExpensePage from "./pages/employeeExpensePage";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./pages/adminDashboard";
import LoginForm from "./pages/loginform";
import EmployeeExpensePage from "./pages/employeeExpensePage";
import ProtectedRoute from "./components/ProtectedRoute";

import ManagerDashboardLayout from "./layout/ManagerDashboardLayout";

function App() {
  const [user, setUser] = useState(null);

   // Load user from localStorage on initial load
   useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<AdminDashboard/>} />
        <Route path="/manager" element={<ManagerDashboardLayout/>} />
        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user} role="admin">
              <AdminDashboard user={user} />
            </ProtectedRoute>
          }
        />{" "} */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute user={user} role="employee">
              <EmployeeExpensePage user={user} />
            </ProtectedRoute>
          }
        />{" "}
      </Routes>
    </Router>
  );
}

export default App;
