import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage'; // Adjust the import path according to your file structure
// import HomePage from './components/HomePage'; // Example of another component

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/" element={<HomePage />} />
          // Add more routes as needed
        </Routes>
      </div>
    </Router>
  );
}

export default App;
