import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getStores } from '../api';
import '../styles/Customer.css';

const Customer = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const storesData = await getStores();
        setStores(storesData);
      } catch (error) {
        console.log('Error fetching stores:', error.message);
      }
    };

    fetchStores();
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="customer-container">
      <h2 className="customer-heading">Customer</h2>
      <button className="customer-logout-button" onClick={handleLogout}>
        Logout
      </button>
      <p className="customer-welcome">Welcome!</p>
      <h3>Available Stores:</h3>
      <div className="customer-store-list">
        {stores.map((store) => (
          <div className="customer-store-item" key={store.id}>
            <Link className="customer-store-link" to={`/customer/store/${store.id}`}>
              {store.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customer;
