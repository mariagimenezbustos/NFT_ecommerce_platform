import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import authContext from "./context/AuthContext";
import axios from "axios";

//Components
import PrivateRoute from "./components/PrivateRoute.jsx";

// Routes and pages
import NFT from "./pages/NFT";

import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";
import Brands from "./pages/brands/Brands";
import About from "./pages/about/About";
import Login from "./pages/login/Login";
import Cart from "./pages/cart/Cart";
import Profile from "./pages/profile/Profile";
import Register from "./pages/login/Register";
import CheckoutSuccess from "./components/CheckoutSuccess";
import Orders from "./pages/Orders";
import PasswordReset from "./pages/login/PasswordReset";
import Product from "./pages/Product";
import Terms from "./pages/footer/Terms";
import BrandPage from "./pages/brands/BrandPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  // const [cart, setCart] = useState([]);

  const login = async (user) => {
    try {
      const { data } = await axios("api/auth/login", {
        method: "POST",
        data: user,
      });
      //store it locally
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    console.log("user is logged out!");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const authContentextObject = {
    isLoggedIn,
    login,
    logout,
  };

  return (
    <>
      <authContext.Provider value={authContentextObject}>
        <Routes>
          {/* general route with content that's displayed on all pages */}
          <Route path="/" element={<NFT />}>
            {/* all page routes go here */}
            <Route path="/Home" element={<Home />} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/Shop/:id" element={<Product />} />
            <Route path="/Brands" element={<Brands />} />
            <Route path="/Brands/:id" element={<BrandPage />} />
            <Route path="/About" element={<About />} />
            <Route path="/Login" element={<Login />} />
            <Route
              path="/Profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/Register" element={<Register />} />
            <Route path="/PasswordReset" element={<PasswordReset />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Success" element={<CheckoutSuccess />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Terms" element={<Terms />} />
          </Route>
        </Routes>
      </authContext.Provider>
    </>
  );
}

export default App;
