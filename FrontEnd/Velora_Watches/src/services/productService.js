import { products } from '../data/products';

const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Fetches a product by its ID from the API
 * Falls back to local data if API call fails
 * @param {string|number} id - The product ID
 * @returns {Promise<Object>} - The product object
 */
export const getProductById = async (id) => {
  console.log(`Fetching product with ID: ${id}`);
  
  try {
    // First try to get from API
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }
    
    const product = await response.json();
    return product;
  } catch (error) {
    console.warn('API fetch failed, using local data instead:', error.message);
    
    // Fallback to local data
    const numericId = parseInt(id, 10);
    const product = products.find(p => p.id === numericId);
    
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    
    return product;
  }
};

/**
 * Fetches all products with optional filtering
 * Falls back to local data if API call fails
 * @param {Object} filters - Optional filters like category, price range, etc.
 * @returns {Promise<Array>} - Array of product objects
 */
export const getProducts = async (filters = {}) => {
  console.log('Fetching products with filters:', filters);
  
  try {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    const response = await fetch(`${API_BASE_URL}/products${queryString}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    
    const productsData = await response.json();
    return productsData;
  } catch (error) {
    console.warn('API fetch failed, using local data instead:', error.message);
    
    // Apply filters to local data
    let filteredProducts = [...products];
    
    if (filters.category) {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    if (filters.minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice);
    }
    
    if (filters.maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower)
      );
    }
    
    return filteredProducts;
  }
};

/**
 * Searches products by name or description
 * @param {string} query - The search query
 * @returns {Promise<Array>} - Array of matching product objects
 */
export const searchProducts = async (query) => {
  return getProducts({ search: query });
};
