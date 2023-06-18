import React, { useState } from 'react';
import { addItemToStore } from '../api';
import '../styles/Store.css';

const Store = () => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  const handleAddItem = async () => {
    try {
      const newItem = {
        name: itemName,
        price: itemPrice,
        description: itemDescription,
      };

      await addItemToStore(newItem);
      console.log('Item added successfully!');
      setItemName('');
      setItemPrice('');
      setItemDescription('');
    } catch (error) {
      console.log('Error adding item:', error.message);
    }
  };

  return (
    <div className="store-container">
      <h2 className="store-heading">Store Page</h2>
      <p className="store-description">Welcome to the store page!</p>
      <h3>Add Item:</h3>
      <div className="store-form">
        <label htmlFor="itemName">Item Name:</label>
        <input
          type="text"
          id="itemName"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>
      <div className="store-form">
        <label htmlFor="itemPrice">Item Price:</label>
        <input
          type="number"
          id="itemPrice"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
        />
      </div>
      <div className="store-form">
        <label htmlFor="itemDescription">Item Description:</label>
        <input
          type="text"
          id="itemDescription"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
        />
      </div>
      <button className="store-form-button" onClick={handleAddItem}>
        Add Item
      </button>
    </div>
  );
};

export default Store;
