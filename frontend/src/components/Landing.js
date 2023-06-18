import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Landing.css';

const Landing = () => {
  return (
    <div className="container">
      <h2>Choose what you want to be?</h2>
      <div className="link-wrapper">
        <Link to="/seller">I'm a Seller</Link>
        <Link to="/customer">I'm a Customer</Link>
      </div>
    </div>
  );
};

export default Landing;

