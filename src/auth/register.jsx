import React, { useState } from "react";
import {useNavigate} from "react-router-dom"

async function registerUser(name, username, passwords) {
  try {
    const response = await fetch("http://localhost:3001/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        username: username,
        passwords: passwords,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Đăng ký thất bại");
    }

    const data = await response.json();
    console.log("Đăng ký thành công:", data);
    return data;
  } catch (error) {
    console.error("Lỗi đăng ký:", error.message);
    throw error;
  }
};
// console.log("Đăng ký với:", username, password, fullName);

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleRegister =  async () => {

    // Đăng ký tài khoản mới
    try {
      const data = await registerUser(fullName, username, password);
      alert("Đăng ký thành công! Tài khoản của bạn đã được tạo.");
      navigate("/login");
    } catch (error) {
      alert(`Đăng ký thất bại: ${error.message}`);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
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
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Đăng ký</h2>
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
        <div style={{ marginBottom: "16px" }}>
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
        <div style={{ marginBottom: "24px" }}>
          <label htmlFor="fullName">Họ và tên:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>
        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: "10px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
          }}
        >
          Đăng ký
        </button>
      </div>
    </div>
  );
};

export default Register;
