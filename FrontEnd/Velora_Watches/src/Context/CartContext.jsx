import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [singleCheckoutItem, setSingleCheckoutItem] = useState(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart items:', error);
      }
    }

    const savedSingleItem = localStorage.getItem('singleCheckoutItem');
    if (savedSingleItem) {
      try {
        setSingleCheckoutItem(JSON.parse(savedSingleItem));
      } catch (error) {
        console.error('Error parsing single checkout item:', error);
      }
    }
  }, []);

  // Save to localStorage when cart or single item changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('storage'));
  }, [cartItems]);

  useEffect(() => {
    if (singleCheckoutItem) {
      localStorage.setItem('singleCheckoutItem', JSON.stringify(singleCheckoutItem));
    }
  }, [singleCheckoutItem]);

  // Add to cart function
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Buy Now function for direct checkout
  const buyNow = (product, quantity = 1) => {
    // Clear existing cart items from checkout to ensure only this item is shown
    const singleItem = { ...product, quantity };
    setSingleCheckoutItem(singleItem);
    localStorage.setItem('singleCheckoutItem', JSON.stringify(singleItem));
    console.log('Buy Now item set:', singleItem);
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    setSingleCheckoutItem(null);
    localStorage.removeItem('singleCheckoutItem');
  };

  // Get cart count
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      singleCheckoutItem,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartCount,
      buyNow
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using the cart context
export const useCart = () => useContext(CartContext);

export default CartContext;