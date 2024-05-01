import { Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar"
import HomePage from "./pages/home"
import Contact from "./pages/contact"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>    
      </>
  )
}

export default App
