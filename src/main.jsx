import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// hooking our index.html to our react code
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
