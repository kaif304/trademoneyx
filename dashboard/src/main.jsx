import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './main.css'

import { BrowserRouter } from 'react-router-dom'
import { GeneralContextProvider } from './components/GeneralContext'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GeneralContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GeneralContextProvider>
  </StrictMode>,
)
