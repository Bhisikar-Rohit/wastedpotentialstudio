import { createRoot } from 'react-dom/client'
import { Logo } from '@pmndrs/branding'
import './styles.css'
import App from './App'

function Overlay() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
      <a href="https://rohit-bhisikar.vercel.app" style={{ position: 'absolute', bottom: 40, left: 90, fontSize: '13px' }}>
        creative studio
        <br />
        portfolio
      </a>
      <div style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }}>wasted potential —</div>
      <div style={{ position: 'absolute', top: 40, right: 40, fontSize: '13px' }}>About</div>
      <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>01/07/2023</div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Overlay />
    <Logo style={{ position: 'absolute', bottom: 40, left: 40, width: 30 }} />
  </>
)
