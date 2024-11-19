import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AdminDashboard from "./pages/adminDashboard";
import LoginForm from "./pages/loginform";
import EmployeeExpensePage from "./pages/employeeExpensePage";
import ManagerDashboardLayout from "./layout/ManagerDashboardLayout";
import { jwtDecode } from "jwt-decode";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

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
    } else {
      console.log("No token found, user not authenticated");
      setUser(null); // If no token, clear user state
    }
  }, []);

  useEffect(() => {
    console.log("User state updated:", user); // This will log whenever user changes
  }, [user]); // This hook will run every time user state changes

  const loginChange = () => {
    const storedUser = localStorage.getItem("user");
    console.log("stored user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm loginChange={loginChange} />} />
        {user && user.role === "manager" && (
          <Route path="/manager" element={<ManagerDashboardLayout />} />
        )}
        <Route path="/login" element={<LoginForm loginChange={loginChange} />} />
        {user && user.role === "admin" && (
          <Route path="/dashboard" element={<AdminDashboard />} />
        )}
        {user && user.role === "employee" && (
          <Route path="/employee" element={<EmployeeExpensePage />} />
        )}
        {/* Catch unmatched routes */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <h1>Unauthorized</h1>
              <p>You are not authorized to access this page</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
