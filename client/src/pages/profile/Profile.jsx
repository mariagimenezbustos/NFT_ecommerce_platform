import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import authContext from "../../context/authContext";

export default function Profile() {
  const [user, setUser] = useState(null);
  const auth = useContext(authContext);
  //   console.log(auth);

  useEffect(() => {
    getUser();
  }, []);

  const logout = () => {
    auth.logout();
  };


  const getUser = async () => {
    try {
      const { data } = await axios("/api/auth/profile", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setUser(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="logout">
        <Link to="/" onClick={logout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40px"
            height="40px"
            viewBox="0 0 40 40"
            version="1.1"
          >
            <title>Sign Out</title>
            <g
              id="Atom/Icon/Sign-Out"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="Sign-Out"
                transform="translate(7.000000, 8.000000)"
                fill="#000000"
                fillRule="nonzero"
              >
                <path
                  d="M2.76076853,12.5 L5.75929613,15.1237117 L5.10079152,15.8762883 L0.670747696,12 L5.10079152,8.12371165 L5.75929613,8.87628835 L2.76076853,11.5 L12,11.5 L12,12.5 L2.76076853,12.5 Z"
                  id="Arrow"
                />
                <polygon
                  id="Door"
                  points="5.89473684 0.96 21.1052632 0.96 21.1052632 23.04 5.89473684 23.04 5.89473684 18.1517647 5 18.1517647 5 24 22 24 22 0 5 5.32907052e-17 5 5.60759358 5.89473684 5.60759358"
                />
              </g>
            </g>
          </svg>
          <p>Sign out</p>
        </Link>
      </div>

      {user && (
        <div>
          <h3>Welcome back {user.firstname}!</h3>

          <div>
            <Link to="/Orders">Orders</Link>
          </div>
        </div>
      )}
    </>
  );
}
