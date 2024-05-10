import React from "react";
import Login from "./pages/auth/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import HomePage from './components/HomePage'; // Example of another component

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
