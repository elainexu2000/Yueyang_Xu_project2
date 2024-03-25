import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <div className='navbar'>
      <div className='navbar-element'>
        <Link to="/">Home</Link>
      </div>
      <div className='navbar-element'>
        <Link to="/simulation">Simulation</Link>
      </div>
      <div className='navbar-element'>
        <Link to="/credits">Credits</Link>
      </div>
    </div>
  );
};

export default Navigation;
