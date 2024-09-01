import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, Button } from "antd";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Menu mode="horizontal" theme="dark">
      <Menu.Item key="databases">
        <Link to="/databases">Databases</Link>
      </Menu.Item>
      <Menu.Item key="create">
        <Link to="/create">Create Database</Link>
      </Menu.Item>
      {user ? (
        <>
          <Menu.Item key="user" style={{ float: "right" }}>
            Logged in as: {user.name}
          </Menu.Item>
          <Menu.Item key="logout" style={{ float: "right" }}>
            <Button type="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Menu.Item>
        </>
      ) : (
        <Menu.Item key="login" style={{ float: "right" }}>
          <Link to="/">Login</Link>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default NavBar;
