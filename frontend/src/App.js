import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SellerPage from './components/SellerPage';
import CustomerPage from './components/CustomerPage';
import LoginPage from './components/LoginPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/seller" element={<SellerPage />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
