/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, shippingCost, updateShippingCost, updateProductAmount } = useCartContext();
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price * item.amount),
    0
  );

  const totalItems = cartItems.reduce((acc, item) => acc + item.amount, 0);
  const total = subtotal + shippingCost;

  const handleShippingChange = (event: { target: { value: any; }; }) => {
    updateShippingCost(Number(event.target.value));
  };

  const handleQuantityChange = (productId: string, newAmount: number) => {
    if (newAmount >= 0) {
      updateProductAmount(productId, newAmount);
    }
  };

  const handleRemoveItem = (productId: string) => {
    updateProductAmount(productId, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-5">
        <h1 className="text-2xl text-pink-400 font-bold">Không có sản phẩm nào trong giỏ hàng</h1>
        <Link to="/shop" className="text-blue-500 hover:text-blue-700 font-semibold">Tiếp tục mua hàng</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-col lg:flex-row shadow-lg my-10 rounded-lg overflow-hidden">
        <div className="w-full lg:w-3/4 bg-white px-10 py-10">
          <div className="flex flex-col lg:flex-row justify-between border-b pb-8 border-pink-200">
            <h1 className="font-semibold text-xl lg:text-2xl text-pink-500">Giỏ hàng</h1>
            <h2 className="font-semibold text-xl lg:text-2xl text-pink-500">{totalItems} sản phẩm</h2>
          </div>
          {cartItems.map(item => (
            <div className="flex items-center hover:bg-pink-100 -mx-8 px-6 py-5" key={item.pid}>
            <div className="flex w-2/5">
              <div className="w-20">
                <img className="w-20" src={item.image} alt={item.name} />
              </div>
              <div className="flex flex-col justify-between ml-4 flex-grow">
                <span className="font-bold text-sm">{item.name}</span>
                <a href="#" onClick={() => handleRemoveItem(item.pid)} className="font-semibold hover:text-red-500 text-gray-500 text-xs mt-1">Xóa</a>
              </div>
            </div>
            <div className="flex justify-center w-1/5">
              <input 
                type="number" 
                className="mx-2 border text-center w-12 rounded text-pink-500" 
                value={item.amount} 
                onChange={(e) => handleQuantityChange(item.pid, parseInt(e.target.value))}
                min="0"
              />
            </div>
            <span className="text-center w-1/5 font-semibold text-sm">{item.price.toLocaleString()}₫</span>
            <span className="text-center w-1/5 font-semibold text-sm">{(item.price * item.amount).toLocaleString()}₫</span>
          </div>
        ))}
          <Link to="/shop" className="flex font-semibold text-indigo-600 text-sm mt-10">
            Tiếp tục mua sắm
          </Link>
        </div>
        <div className="w-full lg:w-1/4 px-8 py-10 bg-pink-100 rounded-r-lg">
          <h1 className="font-semibold text-2xl border-b pb-8 border-pink-200 text-pink-500">Tổng đơn hàng</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase text-pink-600">{totalItems} sản phẩm</span>
            <span className="font-semibold text-sm text-pink-600">{subtotal.toLocaleString()}₫</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase text-pink-500">Phương thức vận chuyển</label>
            <select onChange={handleShippingChange} value={shippingCost} className="block p-2 text-gray-600 w-full text-sm rounded bg-pink-50">
              <option value={20000}>Tiêu chuẩn - 20,000₫</option>
              <option value={50000}>Hỏa tốc - 50,000₫</option>
              <option value={1000000}>Trực thăng - 1,000,000₫</option>
              <option value={0}>Tự đến lấy - Miễn phí</option>
            </select>
          </div>
          <div className="py-10">
            <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase text-pink-500">Code giảm giá</label>
            <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full rounded bg-pink-50" />
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase rounded">Áp dụng</button>
          <div className="border-t mt-8 border-pink-200">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase text-pink-600">
              <span>Tổng chi phí</span>
              <span>{total.toLocaleString()}₫</span>
            </div>
            <button className="bg-pink-500 font-semibold hover:bg-pink-600 py-3 text-sm text-white uppercase w-full rounded" onClick={() => navigate('/checkout')}>
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
);
};

export default CartPage;
