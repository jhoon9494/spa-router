import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, Router } from './components/Router';
import Root from './components/Root';
import About from './components/About';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Route path="/" element={<Root />} />
      <Route path="/about" element={<About />} />
    </Router>
  </React.StrictMode>,
);
