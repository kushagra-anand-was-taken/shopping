import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../action/auth";
import { itemTotal } from "../miscellaneous/cartHelpers";

const Navbar = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;

  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return { color: "#ff9900" };
    } else {
      return { color: "#ffffff" };
    }
  };

  return (
    <>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>
        {!isAuthenticated && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signin")}
                to="/signin"
              >
                Signin
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signup")}
                to="/signup"
              >
                Signup
              </Link>
            </li>
          </>
        )}

        {isAuthenticated && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/shop")}
                to="/shop"
              >
                Shop
              </Link>
            </li>
          </>
        )}

        {isAuthenticated && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/cart")}
                to="/cart"
              >
                Cart
                <sup>
                  <small className="cart-badge">{itemTotal()}</small>
                </sup>
              </Link>
            </li>
          </>
        )}

        {isAuthenticated && user && user.role === 1 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/admin")}
              to="/admin"
            >
              Dashboard
            </Link>
          </li>
        )}

        {isAuthenticated && user && user.role === 0 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/user")}
              to="/user"
            >
              Dashboard
            </Link>
          </li>
        )}

        {isAuthenticated && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={{ cursor: "pointer", color: "#ffffff" }}
                to="/signin"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Signout
              </Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default Navbar;
