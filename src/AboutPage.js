// AboutPage.js
import React from 'react';
import transition from './transition'; // Assuming the transition function is defined in a separate file

function AboutPage() {
  return (
    <div className="content">
      <h1>About Us</h1>
      <p>Welcome to our creative studio.</p>
    </div>
  );
}

export default transition(AboutPage);
