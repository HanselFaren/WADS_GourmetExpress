import React, { useEffect, useState } from 'react';
import { useParams, Link, Route, Routes } from 'react-router-dom';
import BasketPage from './Basket';
import { getStore, getStoreItems } from '../api';
import '../styles/StorePage.css';

const StorePage = () => {
  const { storeId } = useParams();
  const [store, setStore] = useState(null);
  const [items, setItems] = useState([]);
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const storeData = await getStore(storeId);
        setStore(storeData);
      } catch (error) {
        console.log('Error fetching store:', error.message);
      }
    };

    const fetchStoreItems = async () => {
      try {
        const storeItems = await getStoreItems(storeId);
        setItems(storeItems);
      } catch (error) {
        console.log('Error fetching items:', error.message);
      }
    };

    fetchStoreData();
    fetchStoreItems();
  }, [storeId]);

  const handleAddToBasket = (item) => {
    setBasketItems((prevItems) => [...prevItems, item]);
  };

  const handleRemoveFromBasket = (itemId) => {
    setBasketItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <div className="store-container">
      {store ? (
        <div>
          <h2 className="store-heading">{store.name}</h2>
          <p className="store-description">Description: {store.description}</p>
          <h3>Items:</h3>
          {items.map((item) => (
            <div className="store-item" key={item.id}>
              <h4 className="store-item-name">{item.name}</h4>
              <p className="store-item-description">Description: {item.description}</p>
              <p className="store-item-price">Price: {item.price}</p>
              <button className="store-item-button" onClick={() => handleAddToBasket(item)}>
                Add to Basket
              </button>
            </div>
          ))}
          <Routes>
            <Route
              path="/customer/store/:storeId/basket"
              element={<BasketPage items={basketItems} removeFromBasket={handleRemoveFromBasket} />}
            />
          </Routes>
          <p className="store-basket-link">
            <Link to={{ pathname: `/customer/store/${storeId}/basket`, state: { basketItems } }}>
              View Basket ({basketItems.length})
            </Link>
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StorePage;
