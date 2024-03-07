import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Logo } from '@pmndrs/branding';
import './styles.css';
import App from './App';
import AboutPage from './AboutPage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

function AboutPageContent() {
  const controls = useAnimation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    controls.start({
      y: scrollY / 2,
      transition: { type: 'spring', bounce: 0.5 }
    });
  }, [scrollY, controls]);

  return (
    <motion.div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
        opacity: 0.8, // Apply opacity directly to the motion.div
      }}
      animate={controls}
    >
      <h2>About Us</h2>
      <p>Welcome to our creative studio.</p>
      <Link to="/">Get Wasted</Link>
    </motion.div>
  );
}




function Overlay() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
      <a href="/" style={{ position: 'absolute', bottom: 40, left: 40, fontSize: '13px' }}> <br /> </a>
      <a href="/" style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }}>wasted potential —</a>
      <a href="/about" style={{ position: 'absolute', top: 40, right: 40, fontSize: '13px' }}>About</a>
      <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}></div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <>
    <React.StrictMode>
      <Router>
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<AboutPageContent />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </React.StrictMode>
    <Overlay />
  </>
);
