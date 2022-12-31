import React from "react";
import { Link } from "react-router-dom";
import { useLogOut } from "../hooks/useLogOut";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogOut();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg header">
        <h1 className="heading text-light">Todo-App</h1>
        <div className="collapse navbar-collapse">
          {!user && (
            <ul className="navbar-nav links">
              <li className="navbar-item">
                <Link to="/login" className="nav-link text-light">
                  Login
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/signup" className="nav-link text-light">
                  Sign up
                </Link>
              </li>
            </ul>
          )}
          {user && (
            <ul className="navbar-nav links">
              <li className="navbar-item" onClick={handleLogout}>
                <Link to="/login" className="nav-link text-light">
                  Log out
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
