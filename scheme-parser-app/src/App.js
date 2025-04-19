// Import necessary React and React Router components
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import custom components
import LandingPage from './components/LandingPage.js';
import SchemeParser from './components/SchemeParser.js';
// Import styles
import './App.css';

/**
 * Main App component that sets up the application routing
 * Uses React Router to handle navigation between different pages
 */
function App() {
  return (
    // Router component to enable client-side routing
    <Router>
      {/* Main application container */}
      <div className="App">
        {/* Routes configuration */}
        <Routes>
          {/* Route for the landing page (home) */}
          <Route path="/" element={<LandingPage />} />
          {/* Route for the Scheme parser page */}
          <Route path="/parser" element={<SchemeParser />} />
        </Routes>
      </div>
    </Router>
  );
}

// Export the App component as the default export
export default App;
