import { Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar"
import NavbarLogged from "./components/navbar-logged"
import { useAuth } from './context/AuthContext';
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import HomePage from "./pages/home"
import Contact from "./pages/contact"
import Footer from "./components/footer"
import Shop from "./pages/shop/shop"
import NewsPage from "./pages/news/news"
import NewsDetail from "./pages/news/news-detail"
import AboutUs from "./pages/about-us"
import Login from "./pages/login"
import CartPage from "./pages/cart";
import CheckoutPage from "./pages/checkout";
import OrdersPage from "./pages/order/order";
import OrderDetailPage from "./pages/order/order-detail";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProductDetail from "./pages/shop/shop-detail"
import UserProfile from "./pages/profile";
import Admin from "./pages/admin";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const theme = createTheme({
  typography: {
    fontFamily: [
      'Nunito', 
      'sans-serif' 
    ].join(','),
  },
});




function App() {
  const { user } = useAuth(); 

  return (
    <>
    <ToastContainer
      toastClassName="pink-toast"
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />    
  <ThemeProvider theme={theme}>
    <CartProvider username={user?.username} token={user?.token}>
      <OrderProvider username={user?.username} >
     {user ? <NavbarLogged /> : <Navbar />} 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order" element={<OrdersPage />} />
        <Route path="/order/:orderId" element={<OrderDetailPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
      <Footer />
      </OrderProvider>
      </CartProvider>
    </ThemeProvider>
      </>
  )
}

export default App
