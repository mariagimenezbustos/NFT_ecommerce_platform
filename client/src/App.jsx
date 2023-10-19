import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import authContext from "./context/authContext";
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
import CartPage from "./pages/cart/CartPage";
import Profile from "./pages/profile/Profile";
import Register from "./pages/login/Register";
import CheckoutSuccess from "./components/CheckoutSuccess";
import Orders from "./components/orders/Orders";
import PasswordReset from "./pages/login/PasswordReset";
import Product from "./pages/Product";
import Terms from "./pages/footer/Terms";
import CartLogin from "./pages/cartLogin/CartLogin";
import BrandPage from "./pages/brands/BrandPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const login = async (user, cb) => {
    try {
      const { data } = await axios("/api/auth/login", {
        method: "POST",
        data: user,
      });

      //store it locally
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user.id);
      setIsLoggedIn(true);
      if (cb) cb();
      console.log("user is logged in!");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    console.log("user is logged out!");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // if there is a localStorage token, then the user is logged in
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

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
            <Route path="/" element={<Home />} />
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
            <Route path="/CartPage" element={<CartPage />} />

            <Route path="/CheckoutLogin" element={<CartLogin />} />
            <Route path="/Success" element={<CheckoutSuccess />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Terms" element={<Terms />} />
            <Route path="/Orders/all/:user_id" element={<Orders />} />
          </Route>
        </Routes>
      </authContext.Provider>
    </>
  );
}

export default App;
