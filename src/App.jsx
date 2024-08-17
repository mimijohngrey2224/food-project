import React from "react";
import Header from "./components/Header";
import Featured from "./components/Featured";
import Menu from "./components/pages/Menu";
import BreakfastPage from "./components/BreakfastPage";
import Salad from "./components/Salad";
import NigerianSoup from "./components/NigerianSoup";
import Signature from "./components/Signature";
import Home from "./components/pages/Home";
// import Details from "./components/pages/Details";
import Cart from "./components/pages/Cart";
import Footer from "./components/Footer";
import { starter, breakfast, dishes, nigerian, signatures } from "./components/data/EcomData";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom"
// import Restaurant from "./components/pages/Restaurant";
import MenuContextProvider from "./context/MenuContext";
import SignupLogin from "./components/pages/SignupLogin";
import Checkout from "./components/pages/Checkout";
import Thanks from "./components/pages/Thanks";
import 'leaflet/dist/leaflet.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';






function App() {
  const featured = starter.filter((item)=> item.featured === true);
  const breakfastPage = breakfast.filter((item)=> item.BreakfastPage === true);
  const salad = dishes.filter((item)=> item.salad === true);
  const nigerianSoup = nigerian.filter((item)=> item.NigerianSoup === true);
  const signature = signatures.filter((item) => item.signature === true)

  return (
    
       
        <Router>
          <MenuContextProvider>
      <Header />
      <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/restaurant" element={<Restaurant />} /> */}
      {/* <Route path="/menu" element={<Menu />} /> */}
      {/* <Route path="/details" element={<Details />} /> */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<SignupLogin />} />
      <Route path="/thanks" element={<Thanks />} />
        <Route path="/menu"
        element={
          <>
          <Menu />
          <Featured featured={featured} />
          <BreakfastPage breakfastPage={breakfastPage} />
          <Salad salad={salad} />
          <NigerianSoup nigerianSoup={nigerianSoup} />  
          <Signature signature={signature} />
          </>
        } 
        />
     
      <Route/>
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </MenuContextProvider>
    </Router>
    
   
    
  )
}

export default App
