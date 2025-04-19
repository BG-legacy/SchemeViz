// Import React and ReactDOM for rendering the application
import React from 'react';
import ReactDOM from 'react-dom/client';
// Import global styles
import './index.css';
// Import the main App component
import App from './App.js';
// Import web vitals reporting utility
import reportWebVitals from './reportWebVitals.js';

// Create a root element for React to render into
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application inside React's StrictMode
// StrictMode helps identify potential problems in the application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Enable performance monitoring
// Uncomment and configure reportWebVitals to measure performance metrics
// For more information: https://bit.ly/CRA-vitals
reportWebVitals();
