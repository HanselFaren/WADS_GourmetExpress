import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Basket.css';

const BasketPage = ({ items, removeFromBasket }) => {
  const navigate = useNavigate();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleRemoveFromBasket = (itemId) => {
    removeFromBasket(itemId);
  };

  const handlePlaceOrder = async () => {
  try {
    // Create an order object or payload with relevant details
    const order = {
      items: items.map((item) => item.id), // Assuming you want to send an array of item IDs
    };

    // Make an API call to your backend to place the order
    const response = await fetch('https://your-backend-api.com/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    // Check if the request was successful
    if (response.ok) {
      // Set the state to indicate that the order has been placed
      setIsOrderPlaced(true);
      alert('Order placed successfully!');
    } else {
      // Handle the case when the order placement fails
      console.log('Error placing order:', response.status);
      // Display an error message or perform any other action to handle the error
    }
  } catch (error) {
    console.log('Error placing order:', error);
    // Display an error message or perform any other action to handle the error
  }
};

  return (
    <div className="basket-container">
        <h2 className="basket-heading">Basket</h2>
        {items.length === 0 ? (
            <p className="basket-empty">Your basket is empty.</p>
        ) : (
            <ul>
                {items.map((item) => (
                    <li className="basket-item" key={item.id}>
                        <h4 className="basket-item-name">{item.name}</h4>
                        <p className="basket-item-description">Description: {item.description}</p>
                        <p className="basket-item-price">Price: {item.price}</p>
                        <button
                            className="basket-item-remove-button"
                            onClick={() => handleRemoveFromBasket(item.id)}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        )}
        {isOrderPlaced ? (
            <p>Order placed successfully!</p>
        ) : (
            <div className="basket-actions">
                <button onClick={handlePlaceOrder}>Place Order</button>
                <button onClick={() => navigate(-1)}>Back to Store</button>
            </div>
        )}
    </div>

  );
};

export default BasketPage;
