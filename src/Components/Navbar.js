import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='nav'>
     <div className='logo'>
         <Links className='nav-link' to="/">
            Codegrid
         </Links>
     </div>
    <div className='nav-links'>
        <div className="nav-item">
            <Links className='nav-link' to="/">
                Home
            </Links>
         </div>
         <div className="nav-item">
            <Links className='nav-link' to="/about">
                About
            </Links>
         </div> 
        <div className="nav-item">
            <Links className='nav-link' to="/contact">
                Contact
            </Links>
            </div>
        </div>
     </div>
  )
}

export default Navbar