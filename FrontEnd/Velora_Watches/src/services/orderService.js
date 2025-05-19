/**
 * Order service for Velora Watches frontend
 * Handles API calls related to orders
 */

import api from './apiClient';

/**
 * Create a new order
 * @param {Object} orderData - The order data
 * @returns {Promise<Object>} - API response
 */
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders/create', orderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create order' };
  }
};

/**
 * Get all orders for the current user
 * @returns {Promise<Object>} - API response
 */
export const getUserOrders = async () => {
  try {
    const response = await api.get('/orders/my-orders');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch orders' };
  }
};

/**
 * Get a specific order by ID
 * @param {string} orderId - The order ID
 * @returns {Promise<Object>} - API response
 */
export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch order' };
  }
};
