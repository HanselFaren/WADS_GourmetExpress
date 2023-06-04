import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to the GourmetExpress</h1>
      <div className="buttons">
        <Link to="/seller">Seller</Link>
        <Link to="/customer">Customer</Link>
      </div>
    </div>
  );
};

export default LandingPage;
