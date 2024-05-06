import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, styled } from '@mui/material';


const CuteProgress = styled(CircularProgress)(({ theme }) => ({
    color: '#f06292', 
    '& .MuiCircularProgress-circle': {
      strokeLinecap: 'round' 
    }
  }));


const OrdersPage: React.FC = () => {
    const { orders, loading, error } = useOrders();
    const [limit, setLimit] = useState(10);
    const navigate = useNavigate();

    const handleViewDetails = (orderId: string) => {
        navigate(`/order/${orderId}`);
    };

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <CuteProgress />  
        </div>
      );
    }
    
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container min-h-screen mx-auto mt-10 p-5 bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 rounded-xl shadow-lg">
            <div className="flex justify-between">
                <h2 className="text-3xl font-bold text-gray-700">Đơn hàng của tôi</h2>
                <select
                    className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:border-blue-500"
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                >
                    <option value="10">Xem 10 đơn hàng</option>
                    <option value="20">Xem 20 đơn hàng</option>
                    <option value="50">Xem 50 đơn hàng</option>
                </select>
            </div>
            <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="py-3 px-6">Mã đơn hàng</th>
                            <th scope="col" className="py-3 px-6">Ngày mua</th>
                            <th scope="col" className="py-3 px-6">Số lượng</th>
                            <th scope="col" className="py-3 px-6">Tổng tiền</th>
                            <th scope="col" className="py-3 px-6">Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.slice(0, limit).map(order => (
                            <tr key={order.id} className="bg-white border-b">
                                <td className="py-4 px-6">{order.id}</td>
                                <td className="py-4 px-6">{order.date}</td>
                                <td className="py-4 px-6">{order.total_amount}</td>
                                <td className="py-4 px-6">{order.total_price.toLocaleString()}₫</td>
                                <td className="py-4 px-6">
                                    <button 
                                        onClick={() => handleViewDetails(order.id)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Xem chi tiết
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersPage;
