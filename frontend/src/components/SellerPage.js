import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createStore, createItem } from '../api';
import './SellerPage.css';

const SellerPage = () => {
  const [storeName, setStoreName] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const handleCreateStore = async () => {
    const storeData = {
      name: storeName,
    };

    const store = await createStore(storeData);
    if (store) {
      alert('Store created successfully!');
      setStoreName('');
    } else {
      alert('Failed to create the store. Please try again.');
    }
  };

  const handleCreateItem = async () => {
    const itemData = {
      name: itemName,
      price: itemPrice,
    };

    const item = await createItem(itemData);
    if (item) {
      alert('Item created successfully!');
      setItemName('');
      setItemPrice('');
    } else {
      alert('Failed to create the item. Please try again.');
    }
  };

  return (
    <div className="seller-page">
      <h1>Seller Page</h1>
      <div className="store-section">
        <h2>Create a Store</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Store Name"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
          <button onClick={handleCreateStore}>Create Store</button>
        </div>
      </div>
      <div className="item-section">
        <h2>Create an Item</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Item Price"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
          />
          <button onClick={handleCreateItem}>Create Item</button>
        </div>
      </div>
      <div className="navigation">
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default SellerPage;
