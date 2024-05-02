import { Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar"
import NavbarLogged from "./components/navbar-logged"
import { useAuth } from './context/AuthContext';
import HomePage from "./pages/home"
import Contact from "./pages/contact"
import Footer from "./components/footer"
import Shop from "./pages/shop"
import NewsPage from "./pages/news"
import NewsDetail from "./pages/news-detail"
import AboutUs from "./pages/about-us"
import Login from "./pages/login"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProductDetail from "./pages/shop-detail"

const theme = createTheme({
  typography: {
    fontFamily: [
      '"Comic Sans MS"', // Your desired font
      'cursive',
      'sans-serif' // Fallback fonts
    ].join(','),
  },
});

function App() {
  const { user } = useAuth(); 

  return (
    <>
    <ThemeProvider theme={theme}>
     {user ? <NavbarLogged /> : <Navbar />} 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </ThemeProvider>
      </>
  )
}

export default App
