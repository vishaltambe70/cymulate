import React, { useState } from "react";
import "./App.css";
import CreateUserForm from "./Containers/CreateUserForm";
import SignupForm from "./Containers/SignupForm";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./Containers/Dashboard";
import AuthenticatedRoute from "./Containers/AuthenticatedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle authentication changes
  const handleAuthChange = (isAuthenticated) => {
    setIsAuthenticated(isAuthenticated);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            {/* Public Route */}
            <Route
              path="/signin"
              element={
                <SignupForm
                  isAuthenticated={isAuthenticated}
                  onAuthChange={handleAuthChange}
                />
              }
            />
            <Route path="/login" element={<CreateUserForm />} />

            <Route
              path="/dashboard"
              element={
                <AuthenticatedRoute
                  isAuthenticated={isAuthenticated}
                  fallbackPath="/signin"
                >
                  <Dashboard />
                </AuthenticatedRoute>
              }
            />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
