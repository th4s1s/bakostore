import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface CartItem {
    id: string;
    name: string;
    quantity: number;  
    price: number;
    totalPrice: number;
  }
  
  interface UseCartHook {
    cartItems: CartItem[];
    loading: boolean;
    error: string | null;
    refreshCart: () => void;
  }
  

export const useCart = (username: string): UseCartHook => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/cart/show.php?username=${encodeURIComponent(username)}`);
      if (response.status === 200 && response.data) {
        setCartItems(response.data); 
      } else {
        throw new Error('Failed to fetch cart items');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'An error occurred while fetching cart data.');
      } else {
        setError('An error occurred while fetching cart data.');
      }
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      fetchCart();
    }
  }, [username, fetchCart]);

  return {
    cartItems,
    loading,
    error,
    refreshCart: fetchCart,
  };
};
