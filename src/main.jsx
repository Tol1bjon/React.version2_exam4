import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './Translate/Translate'
import App from './App.jsx'
import { FilterProvider } from '../utils/Price.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FilterProvider>
      <App />
    </FilterProvider>
  </StrictMode>,
)
