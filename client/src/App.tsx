import { Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar"
import HomePage from "./pages/home"
import Contact from "./pages/contact"
import Footer from "./components/footer"
import Shop from "./pages/shop"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>  
      <Footer />
      </>
  )
}

export default App
