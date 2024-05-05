/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';


interface Order {
    id: string;
    date: string;
    total_amount: number;
    total_price: number;
}

interface OrderDetail {
    products: any;
    id: string;
    username: string;
    pid: string;
    name: string;
    image: string;
    amount: number;
    price: number;
    total_price: number;
    address: string;
    phone: string;
    ship: number;
}

interface OrderContextType {
    orders: Order[];
    loading: boolean;
    error: string | null;
    fetchOrders: () => Promise<void>;
    fetchOrderDetails: (orderId: string) => Promise<void>;
    selectedOrder: OrderDetail[] | null; 
}


const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode, username: string }> = ({ children, username }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://bakobackend.azurewebsites.net/order/list.php?username=${encodeURIComponent(username)}`);
            if (Array.isArray(response.data)) {
                setOrders(response.data);
            } else {
                setError('Data format error: Expected an array');
                console.error('Data format error: Expected an array', response.data);
            }
        } catch (err) {
            setError('Failed to fetch orders');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [username]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const fetchOrderDetails = async (orderId: string) => {
        try {
            const response = await axios.get(`https://bakobackend.azurewebsites.net/order/detail.php?id=${orderId}`);
            console.log(response.data)
            setSelectedOrder(response.data);
        } catch (err) {
            console.error('Failed to fetch order details', err);
        }
    };

    return (
        <OrderContext.Provider value={{ orders, loading, error, fetchOrderDetails, selectedOrder, fetchOrders}}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
};
