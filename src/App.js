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
import AppLayout from "./AppLayout";
import Register from "./auth/register";

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
