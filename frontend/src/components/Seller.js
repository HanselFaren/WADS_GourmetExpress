import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStores, createStore } from '../api';
import '../styles/Seller.css';

const Seller = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState('');
  const [storeName, setStoreName] = useState('');
  const [isPublic, setIsPublic] = useState(false);

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

  const handleCreateStore = async () => {
    try {
      const newStore = {
        name: storeName,
        isPublic: isPublic,
      };
      const createdStore = await createStore(newStore);
      console.log('Store created successfully!');
      setStoreName('');
      setIsPublic(false);
      setSelectedStore(createdStore.id);
    } catch (error) {
      console.log('Error creating store:', error.message);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="seller-container">
      <h2 className="seller-heading">Seller</h2>
      <button className="seller-button" onClick={handleLogout}>
        Logout
      </button>
      <h3>Create or Select Store:</h3>
      <div className="seller-form">
        <label className="seller-radio-label" htmlFor="createStore">
          Create New Store:
        </label>
        <input
          type="radio"
          id="createStore"
          checked={!selectedStore}
          onChange={() => setSelectedStore('')}
        />
      </div>
      <div className="seller-form">
        <label className="seller-radio-label" htmlFor="selectStore">
          Select Existing Store:
        </label>
        <input
          type="radio"
          id="selectStore"
          checked={!!selectedStore}
          onChange={() => setSelectedStore(stores[0]?.id || '')}
        />
      </div>
      {selectedStore ? (
        <div className="seller-store">
          <p>Selected Store: {selectedStore}</p>
        </div>
      ) : (
        <div className="seller-store">
          <h3>Create Store:</h3>
          <div>
            <label htmlFor="storeName">Store Name:</label>
            <input
              type="text"
              id="storeName"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="isPublic">Public Store:</label>
            <input
              type="checkbox"
              id="isPublic"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
          </div>
          <button className="seller-button" onClick={handleCreateStore}>
            Create Store
          </button>
        </div>
      )}
    </div>
  );
};

export default Seller;
