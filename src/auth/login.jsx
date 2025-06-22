import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Contexts/userContext";

async function loginUser(username, password) {
  try {
    const response = await fetch("http://localhost:3001/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        passwords: password,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Đăng nhập thất bại");
    }

    const data = await response.json();
    console.log("Đăng nhập thành công:", data.user.user.telegram_id);
    return data;
  } catch (error) {
    console.error("Lỗi đăng nhập:", error.message);
    throw error;
  }
}
// console.log("Đăng nhập với:", username, password);

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn reload trang
    try {
      const data = await loginUser(username, password);
      setUser(data.user.user);
      navigate("/homepage"); // Chuyển sang trang chủ
    } catch (error) {
      console.error("Lỗi đăng nhập:", error.message);
      alert(`Đăng nhập thất bại: Sai tài khoản hoặc mật khẩu`);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div
      style={{
        height: "750px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f4f8",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "32px 40px",
          borderRadius: "12px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
          minWidth: "320px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="username">Tên đăng nhập:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            />
          </div>
          <div style={{ marginBottom: "24px" }}>
            <label htmlFor="password">Mật khẩu:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              marginBottom: "12px",
            }}
          >
            Đăng nhập
          </button>
        </form>
        <button
          onClick={handleRegisterRedirect}
          style={{
            width: "100%",
            padding: "10px",
            background: "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Chưa có tài khoản? Đăng ký
        </button>
      </div>
    </div>
  );
};

export default Login;
