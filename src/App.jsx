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
import {
  starter,
  breakfast,
  dishes,
  nigerian,
  signatures,
} from "./components/data/EcomData";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Restaurant from "./components/pages/Restaurant";
import MenuContextProvider from "./context/MenuContext";
// import SignupLogin from "./components/pages/SignupLogin";
import Checkout from "./components/pages/Checkout";
import Thanks from "./components/pages/Thanks";
import "leaflet/dist/leaflet.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import useLocalStorage from "./hooks/useLocalStorage";
import Container from "./components/shared/Container";

function App() {
  const { getItem } = useLocalStorage("auth-token");
  const token = getItem("auth-token");
  let authInitialState = { accessToken: token ?? null };
  return (
    <AuthProvider defaultState={authInitialState}>
      <MenuContextProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thanks" element={<Thanks />} />
            <Route
              path="/menu"
              element={
                <>
                <Container>
                  <Menu />
                  <Featured />
                  <BreakfastPage />
                  <Salad />
                  <NigerianSoup />
                  <Signature />
                  </Container>
                </>
              }
            />

            <Route />
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
        </Router>
      </MenuContextProvider>
    </AuthProvider>
  );
}

export default App;
