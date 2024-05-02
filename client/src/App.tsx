import { Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar"
import HomePage from "./pages/home"
import Contact from "./pages/contact"
import Footer from "./components/footer"
import Shop from "./pages/shop"
import NewsPage from "./pages/news"
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    fontFamily: [
      '"Comic Sans MS"', // Your desired font
      'cursive',
      'sans-serif' // Fallback fonts
    ].join(','),
  }
});

function App() {

  return (
    <>
    <ThemeProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/news" element={<NewsPage />} />
      </Routes>  
      <Footer />
    </ThemeProvider>
      </>
  )
}

export default App
