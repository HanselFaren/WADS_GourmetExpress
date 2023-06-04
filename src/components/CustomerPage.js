import React, { useState, useEffect } from 'react';
import { fetchStoreItems, placeOrder } from '../api';
import './CustomerPage.css';

const CustomerPage = () => {
  const [storeItems, setStoreItems] = useState([]);
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await fetchStoreItems();
      setStoreItems(items);
    };
    fetchItems();
  }, []);

  const handleSelectStore = (storeId) => {
    setSelectedStore(storeId);
    setSelectedItem('');
  };

  const handleSelectItem = (itemId) => {
    setSelectedItem(itemId);
  };

  const handleAddToBasket = () => {
    const itemToAdd = storeItems.find((item) => item.id === selectedItem);
    if (itemToAdd) {
      setBasket((prevBasket) => [...prevBasket, itemToAdd]);
      setSelectedItem('');
    }
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      storeId: selectedStore,
      items: basket.map((item) => item.id),
    };

    const order = await placeOrder(orderData);
    if (order) {
      alert('Order placed successfully!');
      setBasket([]);
    } else {
      alert('Failed to place the order. Please try again.');
    }
  };

  return (
    <div className="customer-page">
      <h1>Customer Page</h1>
      <div className="store-section">
        <h2>Select a Store</h2>
        <div className="store-list">
          {storeItems.map((store) => (
            <div
              key={store.id}
              className={`store ${selectedStore === store.id ? 'selected' : ''}`}
              onClick={() => handleSelectStore(store.id)}
            >
              {store.name}
            </div>
          ))}
        </div>
      </div>
      {selectedStore && (
        <div className="item-section">
          <h2>Select Items</h2>
          <div className="item-list">
            {storeItems
              .filter((item) => item.storeId === selectedStore)
              .map((item) => (
                <div
                  key={item.id}
                  className={`item ${selectedItem === item.id ? 'selected' : ''}`}
                  onClick={() => handleSelectItem(item.id)}
                >
                  {item.name} - ${item.price}
                </div>
              ))}
          </div>
          {selectedItem && (
            <div className="add-to-basket">
              <button onClick={handleAddToBasket}>Add to Basket</button>
            </div>
          )}
        </div>
      )}
      {basket.length > 0 && (
        <div className="basket-section">
          <h2>Basket</h2>
          <div className="basket-items">
            {basket.map((item) => (
              <div key={item.id} className="basket-item">
                {item.name} - ${item.price}
              </div>
            ))}
          </div>
          <div className="place-order">
            <button onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPage;
