import React, { useState } from 'react';
import '../styles/Store.css';

const Store = () => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  const handleAddItem = async () => {
    try {
      // Replace the URL with your backend API endpoint for adding an item to the store
      const response = await fetch('https://your-backend-api.com/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: itemName,
          price: itemPrice,
          description: itemDescription,
        }),
      });

      if (response.ok) {
        console.log('Item added successfully!');
        // Reset the input fields after successful item addition
        setItemName('');
        setItemPrice('');
        setItemDescription('');
      } else {
        console.log('Failed to add item.');
      }
    } catch (error) {
      console.log('Error adding item:', error);
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
      <button className="store-form-button" onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

export default Store;
