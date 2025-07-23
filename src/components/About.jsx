import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <img src="/public/images/jyr_landing.jpg" alt="Jyr" />
      <h1>Your Name</h1>
      <p>Years of Experience: [Number of Years]</p>
      <p>Skills: [List of Skills]</p>
    </div>
  );
};

export default About;
