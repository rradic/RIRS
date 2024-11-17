import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AdminDashboard from "./pages/adminDashboard";
import LoginForm from "./pages/loginform";
import EmployeeExpensePage from "./pages/employeeExpensePage";
import ProtectedRoute from "./components/ProtectedRoute";
import ManagerDashboardLayout from "./layout/ManagerDashboardLayout";
import { jwtDecode } from "jwt-decode";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("tokeen",token)

    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedUser.exp > currentTime) {
          setUser(decodedUser); // Update user state
        } else {
          console.warn("Token has expired");
          localStorage.removeItem("token");
          setUser(null);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser(null);
      }
    }else {
      console.log("No token found, user not authenticated");
      setUser(null); // If no token, clear user state
    }
  }, []);

  useEffect(() => {
    console.log("User state updated:", user); // This will log whenever user changes
  }, [user]); // This hook will run every time user state changes
  


  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        {/* <Route path="/manager" element={<ManagerDashboardLayout />} /> */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute user={user} role="manager">
              <ManagerDashboardLayout user={user} />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user} role="admin">
              <AdminDashboard user={user} />
            </ProtectedRoute>
          }
        />{" "}
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
