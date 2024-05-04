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
import NotFoundPage from "./pages/error/404";


const theme = createTheme({
  typography: {
    fontFamily: [
      'Nunito', 
      'sans-serif' 
    ].join(','),
  },
});




function App() {
  const {user} = useAuth();

  const Layout = ({ children }: { children: React.ReactNode }) => (
    <>
      {user ? <NavbarLogged /> : <Navbar />} 
      {children}
      <Footer />
    </>
  );

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
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/shop" element={<Layout><Shop /></Layout>} />
        <Route path="/news" element={<Layout><NewsPage /></Layout>} />
        <Route path="/news/:id" element={<Layout><NewsDetail /></Layout>} />
        <Route path="/product/:productId" element={<Layout><ProductDetail /></Layout>} />
        <Route path="/about-us" element={<Layout><AboutUs /></Layout>} />
        <Route path="/cart" element={<Layout><CartPage /></Layout>} />
        <Route path="/checkout" element={<Layout><CheckoutPage /></Layout>} />
        <Route path="/order" element={<Layout><OrdersPage /></Layout>} />
        <Route path="/order/:orderId" element={<Layout><OrderDetailPage /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/profile" element={<Layout><UserProfile /></Layout>} />
        <Route path="/admin" element={<Layout><Admin/></Layout>} />
        <Route path="*" element={<NotFoundPage />} /> {/* 404 page */}
      </Routes>
    </OrderProvider>
  </CartProvider>
</ThemeProvider>      
</>
  )
}

export default App
