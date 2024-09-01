import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Form, Input, Button, Typography, message } from "antd";

const { Title } = Typography;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username && password) {
      try {
        const response = await axios.post("http://shamim.umrc.ir/api/v1/login/", {
          username,
          password,
        });

        if (response.status === 200) {
          const { token } = response.data;
          const userData = { name: username };
          login(token, userData);
          message.success("Login successful!");
          navigate("/databases");
        } else {
          message.error("Invalid credentials");
        }
      } catch (error) {
        console.error(error);
        message.error("Error during login. Please try again.");
      }
    } else {
      message.warning("Please enter both username and password");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "50px auto", padding: "20px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <Title level={2} style={{ textAlign: "center" }}>Login</Title>
      <Form
        name="login"
        onFinish={handleLogin}
        layout="vertical"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please enter your username!' }]}
        >
          <Input 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>

        <Form.Item>
          <p style={{ textAlign: 'center' }}>
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
