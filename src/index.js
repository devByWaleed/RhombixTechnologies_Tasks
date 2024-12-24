// Importing Modules & Component
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Creating The Route
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering The Route
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);