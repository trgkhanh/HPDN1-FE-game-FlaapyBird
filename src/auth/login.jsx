import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Đăng nhập tài khoản
    async function loginUser(username, password) {
      try {
        const response = await fetch("http://localhost:3001/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Đăng nhập thất bại");
        }

        const data = await response.json();
        console.log("Đăng nhập thành công:", data);
        return data;
      } catch (error) {
        console.error("Lỗi đăng nhập:", error.message);
        throw error;
      }
    }
    console.log("Đăng nhập với:", username, password);
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      <div>
        <label htmlFor="username">Tên đăng nhập:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Mật khẩu:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button onClick={handleLogin}>Đăng nhập</button>
      <button onClick={handleRegisterRedirect}>Chuyển sang đăng ký</button>
    </div>
  );
};

export default Login;
