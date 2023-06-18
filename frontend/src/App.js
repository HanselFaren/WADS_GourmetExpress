import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Landing from './components/Landing';
import Seller from './components/Seller';
import Store from './components/Store';
import Customer from './components/Customer';
import StorePage from './components/StorePage'; // Import the StorePage component
import { FirebaseProvider } from './Firebase';

const App = () => {
  return (
    <FirebaseProvider>
      <Router>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/store" element={<Store />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/customer/store/:storeId" element={<StorePage />} />
        </Routes>
      </Router>
    </FirebaseProvider>
  );
};

export default App;


