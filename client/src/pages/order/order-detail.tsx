import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import { CircularProgress, styled } from '@mui/material';

const CuteProgress = styled(CircularProgress)(({ theme }) => ({
    color: '#f06292', 
    '& .MuiCircularProgress-circle': {
      strokeLinecap: 'round' 
    }
  }));



const OrderDetailPage: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const { fetchOrderDetails, selectedOrder, error } = useOrders();
    const user = localStorage.getItem("user")
    
    if (!user) {
        return <Navigate to="/login" replace={true}/>
    }
    
    if (user && selectedOrder && user.username !== selectedOrder[0]?.username) {
        return <Navigate to="/hellodarknessmyoldfriend" replace={true}/>
    }

    useEffect(() => {
        if (orderId) {
            fetchOrderDetails(orderId);
        }
    }, [orderId, fetchOrderDetails]);

    if (error) return <div className="text-red-500">Error: {error}</div>;

    if (!selectedOrder) {
        return (
          <div className="flex items-center justify-center min-h-screen">
            <CuteProgress />  
          </div>
        );
      }

    const totalAmount = selectedOrder.reduce((acc, item) => acc + item.amount, 0);
    const totalPrice = selectedOrder.reduce((acc, item) => acc + item.total_price, 0);
    const shippingCost = selectedOrder[0]?.ship || 0;
    const grandTotal = totalPrice + shippingCost;

    return (
        <div className="container mx-auto mt-10 mb-10 px-5">
            <div className="mb-6 bg-gradient-to-br from-pink-300 via-purple-200 to-indigo-200 p-6 rounded-xl shadow-xl">
                <h2 className="text-2xl font-bold text-pink-700">Chi tiết đơn hàng</h2>
                <p className="text-md text-pink-600">Mã đơn hàng: {selectedOrder[0].id}</p>
                <p className="text-md text-pink-600">Tổng số lượng: {totalAmount}</p>
                <p className="text-md text-pink-600">Tổng tiền: {grandTotal.toLocaleString()}₫</p>
            </div>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 text-gray-900">
                    <thead className="bg-pink-100">
                        <tr>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Hình ảnh</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sản phẩm</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Giá</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Số lượng</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Tổng cộng</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {selectedOrder.map((item, index) => (
                            <tr key={index} className="hover:bg-pink-50">
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <img src={item.image} alt={item.name} className="w-20 mx-auto" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <a href={`/product/${item.pid}`} className="text-blue-600 hover:text-blue-800">{item.name}</a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{item.price.toLocaleString()}₫</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{item.amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{item.total_price.toLocaleString()}₫</td>
                            </tr>
                        ))}
                        <tr className="bg-pink-50">
                            <td className="text-right px-6 py-4 text-sm font-medium" colSpan={4}><b>Giá sản phẩm</b></td>
                            <td className="text-right px-6 py-4 text-sm font-medium">{totalPrice.toLocaleString()}₫</td>
                        </tr>
                        <tr className="bg-pink-50">
                            <td className="text-right px-6 py-4 text-sm font-medium" colSpan={4}><b>Phí vận chuyển</b></td>
                            <td className="text-right px-6 py-4 text-sm font-medium">{shippingCost.toLocaleString()}₫</td>
                        </tr>
                        <tr className="bg-pink-50">
                            <td className="text-right px-6 py-4 text-sm font-medium" colSpan={4}><b>Tổng tiền</b></td>
                            <td className="text-right px-6 py-4 text-sm font-medium">{grandTotal.toLocaleString()}₫</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDetailPage;
