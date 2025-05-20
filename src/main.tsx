import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import {AuthProvider} from "./components/AuthProvider.tsx";
import {CartProvider} from "./components/CartProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <AuthProvider>
          <CartProvider>
              <App/>
          </CartProvider>
      </AuthProvider>
  </BrowserRouter>,
)
