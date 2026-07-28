import App from 'app'
import { Analytics } from '@vercel/analytics/react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/globals.css'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <Analytics />
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>
)
