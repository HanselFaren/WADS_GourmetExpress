import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        // Replace the URL with your backend API endpoint for fetching existing stores
        const response = await fetch('https://your-backend-api.com/api/stores');
        const data = await response.json();

        if (response.ok) {
          setStores(data);
        } else {
          console.log('Failed to fetch stores.');
        }
      } catch (error) {
        console.log('Error fetching stores:', error);
      }
    };

    fetchStores();
  }, []);

  const handleCreateStore = async () => {
    try {
      // Replace the URL with your backend API endpoint for creating a store
      const response = await fetch('https://your-backend-api.com/api/stores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: storeName,
          isPublic: isPublic,
        }),
      });

      if (response.ok) {
        console.log('Store created successfully!');
        // Reset the input fields after successful store creation
        setStoreName('');
        setIsPublic(false);

        // Redirect to the newly created store page
        const store = await response.json();
        setSelectedStore(store.id);
      } else {
        console.log('Failed to create store.');
      }
    } catch (error) {
      console.log('Error creating store:', error);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="seller-container">
      <h2 className="seller-heading">Seller</h2>
      <button className="seller-button" onClick={handleLogout}>Logout</button>
      <h3>Create or Select Store:</h3>
      <div className="seller-form">
        <label className="seller-radio-label" htmlFor="createStore">Create New Store:</label>
        <input
          type="radio"
          id="createStore"
          checked={!selectedStore}
          onChange={() => setSelectedStore('')}
        />
      </div>
      <div className="seller-form">
        <label className="seller-radio-label" htmlFor="selectStore">Select Existing Store:</label>
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
          <button className="seller-button" onClick={handleCreateStore}>Create Store</button>
        </div>
      )}
    </div>
  );
};


export default Seller;
