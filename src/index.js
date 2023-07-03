import React from 'react'
import { createRoot } from 'react-dom/client'
import { Logo } from '@pmndrs/branding'
import './styles.css'
import App from './App'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function Overlay() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
      <a href="" style={{ position: 'absolute', bottom: 40, left: 90, fontSize: '13px' }}>
        creative studio
        <br />
        portfolio
      </a>
      <div style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }}>wasted potential —</div>
      <div style={{ position: 'absolute', top: 40, right: 40, fontSize: '13px' }}>About</div>
      <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>01/06/2023</div>
    </div>
  )
}


createRoot(document.getElementById('root')).render(
  <>
   <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
    <Overlay />
    <Logo style={{ position: 'absolute', bottom: 40, left: 40, width: 30 }} />
  </>
)


 
