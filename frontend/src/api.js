import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'https://your-backend-api.com';

const api = axios.create({
  baseURL: BASE_URL,
});

export { api, useNavigate };

export const getStores = async () => {
  try {
    const response = await api.get('/api/stores');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.detail);
  }
};

export const addItem = async (item) => {
  try {
    const response = await api.post('/api/items', item);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.detail);
  }
};

export const createStore = async (store) => {
  try {
    const response = await api.post('/api/stores', store);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.detail);
  }
};

export const getStore = async (storeId) => {
  try {
    const response = await api.get(`/api/stores/${storeId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.detail);
  }
};

export const getStoreItems = async (storeId) => {
  try {
    const response = await api.get(`/api/stores/${storeId}/items`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.detail);
  }
};

export const placeOrder = async (items) => {
  try {
    const response = await api.post('/api/orders', items);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.detail);
  }
};
