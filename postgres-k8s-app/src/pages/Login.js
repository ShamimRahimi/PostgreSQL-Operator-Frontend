import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

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
          navigate("/databases");
        } else {
          alert("Invalid credentials");
        }
      } catch (error) {
        console.log(error);
        alert("Error during login. Please try again.");
      }
    } else {
      alert("Please enter both username and password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
