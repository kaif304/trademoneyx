import './style.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>
      <h1 class="text-3xl font-bold underline">
        Hello world!
      </h1>
    </div>
  </StrictMode>,
)
