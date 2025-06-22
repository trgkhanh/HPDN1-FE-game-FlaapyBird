import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "./App.css";

import LeaderboardPage from "./pages/LeaderboardPage";
import GamePage from "./pages/GamePage";
import GameHomePage from "./pages/GameHomePage";
import MissionsBoardPage from "./pages/MissionsBoardPage";
import Login from "./auth/login";
import Register from "./auth/register";

function AppLayout() {
  const location = useLocation();
  const isGamePage = location.pathname === "/game";
  const isHomePage = location.pathname === "/homepage";
  const isLoginPage = location.pathname === "/";
  const isRegisterPage = location.pathname === "/register";

  return (
    <div className="App min-h-screen bg-sky-100">
      {!(isHomePage || isGamePage || isLoginPage || isRegisterPage) && (
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Flappy Bird Mini App
          </h1>
          <nav className="mb-6 text-center">
            <Link to="/homepage" className="mr-4 text-blue-600 hover:underline">
              Trang chủ
            </Link>
            {/* <Link to="/leaderboard" className="text-blue-600 hover:underline">
              Bảng xếp hạng
            </Link>
            <Link to="/missionboard" className="text-blue-600 hover:underline">
              Bảng nhiệm vụ
            </Link> */}
          </nav>
        </div>
      )}

      <Routes>
        <Route path="/homepage" element={<GameHomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="*" element={<GamePage />} /> {/* fallback */}
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/missionboard" element={<MissionsBoardPage />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default AppLayout;
