/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import { useState } from 'react';

const CartPage = () => {
  const { cartItems } = useCartContext();
  const [shippingCost, setShippingCost] = useState(100000); 
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price * item.amount),
    0
  );

  const totalItems = cartItems.reduce((acc, item) => acc + item.amount, 0);

  // Calculate the total including shipping
  const total = subtotal + shippingCost;

  const handleShippingChange = (event: { target: { value: any; }; }) => {
    setShippingCost(Number(event.target.value));
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
      <div className="flex shadow-lg my-10 rounded-lg overflow-hidden">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b border-pink-200 pb-8">
            <h1 className="font-semibold text-2xl text-pink-500">Giỏ hàng</h1>
            <h2 className="font-semibold text-2xl text-pink-500">{totalItems} sản phẩm</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-pink-400 text-xs uppercase w-2/5">Chi tiết sản phẩm</h3>
            <h3 className="font-semibold text-center text-pink-400 text-xs uppercase w-1/5">Số lượng</h3>
            <h3 className="font-semibold text-center text-pink-400 text-xs uppercase w-1/5">Giá</h3>
            <h3 className="font-semibold text-center text-pink-400 text-xs uppercase w-1/5">Tổng</h3>
          </div>
          {cartItems.map(item => (
            <div className="flex items-center hover:bg-pink-100 -mx-8 px-6 py-5" key={item.id}>
              <div className="flex w-2/5">
                <div className="w-20">
                  <img className="h-24 rounded-full" src={item.image} alt={item.name} />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{item.name}</span>
                  <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs mt-1">Xóa</a>
                </div>
              </div>
              <div className="flex justify-center w-1/5">
                <input className="mx-2 border text-center w-8 rounded text-pink-500" type="text" value={item.amount} />
              </div>
              <span className="text-center w-1/5 font-semibold text-sm">{item.price}₫</span>
              <span className="text-center w-1/5 font-semibold text-sm">{item.price * item.amount}₫</span>
            </div>
          ))}
          <Link to="/shop" className="flex font-semibold text-indigo-600 text-sm mt-10">
            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H51.197C23 296 0 319 0 347.197v50.133C0 424.1 23 448 51.197 448h82.862c28.197 0 51.197-23.9 51.197-50.67v-50.133c0-28.197-23-51.197-51.197-51.197zm261.888 0H313.046c-28.197 0-51.197 23-51.197 51.197v50.133c0 26.77 23 50.67 51.197 50.67h82.901C424.1 448 448 424.1 448 397.33v-50.133c0-28.197-23.9-51.197-51.197-51.197zM224.3 32c-49.626 0-89.941 40.315-89.941 89.941 0 49.626 40.315 89.941 89.941 89.941s89.941-40.315 89.941-89.941C314.241 72.315 273.926 32 224.3 32z"/></svg>
            Tiếp tục mua sắm
          </Link>
        </div>
        <div id="summary" className="w-1/4 px-8 py-10 bg-pink-100 rounded-r-lg">
          <h1 className="font-semibold text-2xl text-pink-500 border-b border-pink-200 pb-8">Tổng đơn hàng</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase text-pink-600">{totalItems} sản phẩm</span>
            <span className="font-semibold text-sm text-pink-600">{subtotal}₫</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase text-pink-500">Phương thức vận chuyển</label>
            <select onChange={handleShippingChange} className="block p-2 text-gray-600 w-full text-sm rounded bg-pink-50">
              <option value={1000000}>Vận chuyển bằng trực thăng - 1000000₫</option>
              <option value={50000}>Vận chuyển bằng xe máy - 50000₫</option>
              <option value={0}>Tự đến lấy - Miễn phí</option>
            </select>
          </div>
          <div className="py-10">
            <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase text-pink-500">Code giảm giá</label>
            <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full rounded bg-pink-50" />
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase rounded">Áp dụng</button>
          <div className="border-t border-pink-200 mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase text-pink-600">
              <span>Tổng chi phí</span>
              <span>{total}₫</span>
            </div>
            <button className="bg-pink-500 font-semibold hover:bg-pink-600 py-3 text-sm text-white uppercase w-full rounded">Thanh toán</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
