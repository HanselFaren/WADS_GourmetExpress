import React, { useEffect, useState } from 'react';
import { useParams, Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import BasketPage from './Basket';
import '../styles/StorePage.css';

const StorePage = () => {
  const { storeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [items, setItems] = useState([]);
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        // Replace the URL with your backend API endpoint for fetching a specific store
        const response = await fetch(`https://your-backend-api.com/api/stores/${storeId}`);
        const data = await response.json();
        setStore(data);
      } catch (error) {
        console.log('Error fetching store:', error);
      }
    };

    const fetchItems = async () => {
      try {
        // Replace the URL with your backend API endpoint for fetching items of a specific store
        const response = await fetch(`https://your-backend-api.com/api/stores/${storeId}/items`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.log('Error fetching items:', error);
      }
    };

    fetchStore();
    fetchItems();
  }, [storeId]);

  useEffect(() => {
    if (location.state && location.state.basketItems) {
      setBasketItems(location.state.basketItems);
    }
  }, [location.state]);

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
                <button className="store-item-button" onClick={() => handleAddToBasket(item)}>Add to Basket</button>
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
