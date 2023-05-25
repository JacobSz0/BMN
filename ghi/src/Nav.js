import { NavLink } from "react-router-dom";
import { useToken } from "./Authentication.js";
import React, { useState, useEffect} from "react";

function Nav() {
  const { token, logout } = useToken();
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(token));


  useEffect(() => {
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

  }, [token]);

  return (
    <nav className="navbar navbar-expand-lg nav-bar-green">
      <div className="container-fluid">
        <NavLink className="nav-main" to="/">
          Main
        </NavLink>
        <NavLink className="nav-redirect" to="/bmn_list">
          Movie List
        </NavLink>
        <NavLink className="nav-redirect" to="/hall_of_memes">
          Hall of Memes
        </NavLink>
            {!isLoggedIn && (
              <NavLink className="nav-redirect" to="/login">
                Login
              </NavLink>
            )}
            {isLoggedIn && (
              <NavLink className="nav-redirect" onClick={logout}>
                Logout
              </NavLink>
            )}
      </div>
    </nav>
  );
}

export default Nav;
