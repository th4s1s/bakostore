import  { useEffect, useState } from 'react';
import { useCartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext'


const CheckoutPage = () => {
  const { cartItems, shippingCost, checkoutCart } = useCartContext();
  const [selectedOption, setSelectedOption] = useState('false');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isCheckout, setisCheckout] = useState(false)
  const navigate = useNavigate();
  const { fetchOrders } = useOrders();
  const { user } = useAuth();


  const totalItems = cartItems.reduce((acc, item) => acc + item.amount, 0);
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.amount, 0);
  const total = subtotal + shippingCost;

  const defaultStoreAddress = '268 Lý Thường Kiệt P13 Quận 10 TPHCM';

  useEffect(() => {
    const shouldPickUp = shippingCost === 0;
    setSelectedOption(shouldPickUp ? 'true' : 'false');
    if (shouldPickUp) {
      setAddress('268 Lý Thường Kiệt P13 Quận 10 TPHCM');
      setPhone(user?.phone || '0969696900');
    } else {
      setAddress('');
      setPhone('');
    }
  }, [shippingCost, user?.phone]);


  const handleOptionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      const newValue = event.target.value;
      setSelectedOption(newValue);
      if (newValue === 'true') {
          setAddress(defaultStoreAddress);
          setPhone(user.phone);
      } else {
          setAddress('');
          setPhone('');
      }
  };

  const handleAddressChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setAddress(event.target.value);
  };

  const handlePhoneChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPhone(event.target.value);
  };

  const notifySuccess = () => {
    toast.success('Mua hàng thành công! Quay lại cửa hàng ...', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleCheckout = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setisCheckout(true);
    try {
      if (phone.length !== 10 || phone[0] !== '0') {
        toast.error('Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số.');
        return;
      }
      await checkoutCart(address, phone);
      notifySuccess();
      fetchOrders();
      setTimeout(() => {
        navigate('/shop');
      }, 2000);
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error('Checkout failed. Please try again.');
    }
    finally {
      setisCheckout(false);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5 bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 rounded-xl shadow-lg">
      <ToastContainer />
      <div className="flex flex-col md:flex-row shadow-md my-10 bg-white rounded-lg overflow-hidden">
        <div className="w-full md:w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl text-pink-500">Địa chỉ nhận hàng</h1>
          </div>
          <form autoComplete="off" onSubmit={handleCheckout} className="mt-8">
            <input name="utf8" type="hidden" value="✓" />
            <div className="mb-4">
            <label className={`radio-label ${shippingCost === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <input type="radio" name="shippingOption" className="input-radio" value="false"
                checked={selectedOption === 'false'} onChange={handleOptionChange}
                disabled={shippingCost === 0}/>
                <span className="ml-2">Giao tận nơi</span>
              </label>
            </div>
            {selectedOption === 'false' && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Địa chỉ</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={address}
                  onChange={handleAddressChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <label className="block text-gray-700 text-sm font-bold mt-2 mb-2" htmlFor="phone">Số điện thoại</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            )}
            <div className="mb-4">
            <label className={`radio-label ${shippingCost !== 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <input type="radio" name="shippingOption" className="input-radio" value="true"
                checked={selectedOption === 'true'} onChange={handleOptionChange}
                disabled={shippingCost !== 0}/>
                <span className="ml-2">Nhận tại cửa hàng</span>
              </label>
            </div>
            <button type="submit" disabled={isCheckout} className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline float-right">
              Đặt hàng
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/4 bg-white px-8 py-10">
          <div className="flex justify-between border-b pb-8">
            <h2 className="font-semibold text-2xl text-pink-500">{totalItems} sản phẩm</h2>
          </div>
          {cartItems.map((item) => (
            <div key={item.pid} className="flex justify-between mt-4 items-center">
              <img src={item.image} alt={item.name} className="w-20 mr-2" />
              <div className="flex-grow">
                <span className="block font-bold">{item.name}</span>
                <span className="block text-sm">{item.price * item.amount}₫ x {item.amount}</span>
              </div>
            </div>
          ))}
          <div className="bg-white p-4 rounded-lg shadow">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b">
                  <td className="py-4 px-2">Thành tiền</td>
                  <td className="py-4 px-6 text-right">
                    <span className="font-semibold">{subtotal.toLocaleString()}₫</span>
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="py-4 px-2">Phí vận chuyển</td>
                  <td className="py-4 px-6 text-right">
                    <span className="font-semibold">{shippingCost.toLocaleString()}₫</span>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td className="py-4 px-2 font-bold text-gray-900">Tổng</td>
                  <td className="py-4 px-6 text-right font-bold text-gray-900">
                    <span className="text-pink-500">{total.toLocaleString()}₫</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
