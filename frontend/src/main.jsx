import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { RoutesProvider } from './routesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <RoutesProvider>
        <App />
      </RoutesProvider>
    </BrowserRouter>
  </StrictMode>,
)