 
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import './styles/global.css'; // Optional global styles for responsiveness

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './styles/global.css' // Import global styles for responsive design
import App from './App.jsx'
import { UserProvider } from './Context/UserContext'
import { CartProvider } from './Context/CartContext'
import { WishlistProvider } from './Context/WishlistContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)

