import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <span>Logged in as: {user ? user.name : "Guest"}</span>
      <Link to="/databases">Databases</Link>
      <Link to="/create">Create Database</Link>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <Link to="/">Login</Link>
      )}
    </nav>
  );
};

export default NavBar;
