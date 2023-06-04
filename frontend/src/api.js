const BASE_URL = 'http://localhost:5000'; // Replace with your backend API base URL

// Fetch all store items
export const fetchStoreItems = async () => {
  const response = await fetch(`${BASE_URL}/api/store/items`);
  if (!response.ok) {
    throw new Error('Failed to fetch store items');
  }
  return response.json();
};

// Create a store
export const createStore = async (storeData) => {
  const response = await fetch(`${BASE_URL}/api/store`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(storeData),
  });
  if (!response.ok) {
    throw new Error('Failed to create store');
  }
  return response.json();
};

// Create an item
export const createItem = async (itemData) => {
  const response = await fetch(`${BASE_URL}/api/store/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemData),
  });
  if (!response.ok) {
    throw new Error('Failed to create item');
  }
  return response.json();
};

// Place an order
export const placeOrder = async (orderData) => {
  const response = await fetch(`${BASE_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    throw new Error('Failed to place order');
  }
  return response.json();
};
