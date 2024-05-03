import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface CartItem {
    pid: string;
    name: string;
    amount: number;  
    price: number;
    image: string; 
}

interface CartContextType {
    cartItems: CartItem[];
    loading: boolean;
    shippingCost: number;
    error: string | null;
    refreshCart: () => void;
    updateShippingCost: (cost: number) => void;
    addProductToCart: (productId: string, name: string, price: number, quantity: number, img: string) => void;
    updateProductAmount: (productId: string, newAmount: number) => Promise<void>;
}


const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode, username: string, token: string }> = ({ children, username, token }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [shippingCost, setShippingCost] = useState(() => {
            return JSON.parse(localStorage.getItem('shippingCost') as string) || 100000;
        });
    
    const saveCartItems = (items: CartItem[]) => {
            localStorage.setItem('cartItems', JSON.stringify(items));
            setCartItems(items);
    };

    const fetchCart = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/api/cart/show.php?username=${encodeURIComponent(username)}`);
            if (response.status === 200 && response.data) {
                saveCartItems(response.data);
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
        const items = localStorage.getItem('cartItems');
        if (items) {
            setCartItems(JSON.parse(items));
        } else if (username) {
            fetchCart();
        }
    }, [username, fetchCart]);

    useEffect(() => {
        localStorage.setItem('shippingCost', JSON.stringify(shippingCost));
      }, [shippingCost]);

      const updateShippingCost = (cost: number) => {
        setShippingCost(cost);
      };

    const addProductToCart = async (productId: string, name: string, price: number, amount: number, img: string) => {
        const newItem = { pid: productId, name: name, amount, price, image: img };
        const updatedCartItems = [...cartItems, newItem];
        saveCartItems(updatedCartItems);
        
        try {
            await axios.post(`/api/cart/add.php`, `username=${username}&token=${token}&pid=${productId}&amount=${amount}`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            fetchCart(); 
        } catch (error) {
            console.error('Failed to add item to cart:', error);
        }
    };
    
    const updateProductAmount = async (productId: string, newAmount: number) => {
        const updatedCartItems = cartItems.map(item =>
            item.pid === productId ? { ...item, amount: newAmount } : item
        );
        saveCartItems(updatedCartItems);

    
        try {
            const response = await axios.post(`/api/cart/update.php`, `username=${username}&token=${token}&pid=${productId}&amount=${newAmount}`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if (response.status === 200) {
                console.log('Update successful:', response);
                fetchCart(); 
            } else {
                console.error('Failed to update amount with status:', response.status);
            }
        } catch (error) {
            console.error('Failed to update amount:', error);
        }
    };
    


    return (
        <CartContext.Provider value={{ cartItems, loading, error, refreshCart: fetchCart, addProductToCart, updateShippingCost, shippingCost, updateProductAmount }}>
            {children}
        </CartContext.Provider>
    );
};


// Hook to use the cart's context
export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
};
