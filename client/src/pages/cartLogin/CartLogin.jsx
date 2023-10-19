import "./CartLogin.css";
import { useContext, useState } from "react";
import authContext from "../../context/authContext";
import CartContext from "../../context/cart/CartContext";
import axios from "axios";

export default function CartLogin() {
  const auth = useContext(authContext);

  const { cartItems } = useContext(CartContext);

  const [credentialsLogin, setCredentialsLogin] = useState({
    email: "",
    password: ""
  });

  const [credentialsRegister, setCredentialsRegister] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    marketing: false
  });

  const [credentialsGuest, setCredentialsGuest] = useState({
    firstname: "",
    lastname: "",
    email: ""
  });

  const redirectPayment = async () => {
    try {
      const { data } = await axios.post(
        "/api/stripe/create-checkout-session",
        { products: cartItems },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(data.url);
      window.location.replace(data.url);

      console.log(data.id);
      props.setId(data.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeLogin = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;

    setCredentialsLogin({ ...credentialsLogin, [name]: value });
  };

  const handleChangeRegister = (e) => {
    e.preventDefault();
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    setCredentialsRegister({ ...credentialsRegister, [name]: value });
  };

  const handleChangeGuest = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;

    setCredentialsGuest({ ...credentialsGuest, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();
    auth.login(credentialsLogin, redirectPayment);
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      console.log(credentialsRegister);
      const { data } = await axios("/api/auth/register", {
        method: "POST",
        data: credentialsRegister,
      });
      console.log(data.message);
      setCredentialsRegister(data.message);
      auth.login(credentialsRegister, redirectPayment);
    } catch (error) {
      console.log(error);
      setData(error.message);
    }
  };

  // const guest = async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log(credentialsGuest);
  //     const { data } = await axios("/api/auth/guest", {
  //       method: "POST",
  //       data: credentialsGuest,
  //     });
  //     console.log(data.message);
  //     setCredentialsGuest(data.message);
  //     auth.login(credentialsGuest, redirectPayment);
  //   } catch (error) {
  //     console.log(error);
  //     setData(error.message);
  //   }
  // };

  return (
    <>
      {auth.isLoggedIn ? (
        redirectPayment()
      ) : (
        <div id="CartLogin">
          <form id="loginForm" onSubmit={login}>
            <h2>I'm already a user...</h2>

            <div className="form-requirements">
              <label>
                Email
                <input
                  value={credentialsLogin.email}
                  onChange={handleChangeLogin}
                  name="email"
                  type="text"
                />
              </label>

              <label>
                Password
                <input
                  value={credentialsLogin.password}
                  onChange={handleChangeLogin}
                  name="password"
                  type="password"
                />
              </label>
            </div>

            <button>Log In</button>
          </form>

          <form id="registerForm" onSubmit={register}>
            <h2>I want to become a user...</h2>

            <label>
              Firstname
              <input
                value={credentialsRegister.firstname}
                onChange={handleChangeRegister}
                name="firstname"
                type="text"
              />
            </label>

            <label>
              Lastname
              <input
                value={credentialsRegister.lastname}
                onChange={handleChangeRegister}
                name="lastname"
                type="text"
              />
            </label>

            <label>
              Email
              <input
                value={credentialsRegister.email}
                onChange={handleChangeRegister}
                name="email"
                type="text"
              />
            </label>

            <label>
              Password
              <input
                value={credentialsRegister.password}
                onChange={handleChangeRegister}
                name="password"
                type="password"
              />
            </label>

            <label>
              I want to receive news via email
              <input
                checked={credentialsRegister.marketing}
                onChange={handleChangeRegister}
                name="marketing"
                type="checkbox"
                className="checkbox"
              />
            </label>

            <button>Register</button>
          </form>

          {/* <form id="guestForm" onSubmit={guest}>
            <h2>I don't want to become a user...</h2>

            <label>
              Firstname
              <input
                value={credentialsGuest.firstname}
                onChange={handleChangeGuest}
                name="firstname"
                type="text"
              />
            </label>

            <label>
              Lastname
              <input
                value={credentialsGuest.lastname}
                onChange={handleChangeGuest}
                name="lastname"
                type="text"
              />
            </label>

            <label>
              Email
              <input
                value={credentialsGuest.email}
                onChange={handleChangeGuest}
                name="email"
                type="text"
              />
            </label>

            <button>Continue as guest</button>
          </form> */}
        </div>
      )}
    </>
  );
}
