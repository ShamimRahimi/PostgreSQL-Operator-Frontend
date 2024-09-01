import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, Button, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import './NavBar.css'; 

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="user-info" disabled>
        <span>{user.name}</span>
      </Menu.Item>
      <Menu.Item key="logout">
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          style={{ width: '100%' }}
        >
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="navbar-container">
      <Menu mode="horizontal" theme="dark" style={{ flex: 1 }}>
        <Menu.Item key="databases">
          <Link to="/databases">Databases</Link>
        </Menu.Item>
        <Menu.Item key="create">
          <Link to="/create">Create Database</Link>
        </Menu.Item>
      </Menu>
      {user ? (
        <Dropdown overlay={userMenu} trigger={['click']}>
          <Button
            icon={<UserOutlined />}
            style={{
              color: 'white',
              backgroundColor: '#001529',
              border: 'none',
              marginLeft: 'auto'
            }}
          />
        </Dropdown>
      ) : (
        <Menu.Item key="login" style={{ float: "right" }}>
          <Link to="/" style={{ color: 'white' }}>Login</Link>
        </Menu.Item>
      )}
    </div>
  );
};

export default NavBar;
