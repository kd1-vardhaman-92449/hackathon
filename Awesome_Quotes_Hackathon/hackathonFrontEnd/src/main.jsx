import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <div className='container'>
      <App />
    </div>
  </BrowserRouter>,
)
