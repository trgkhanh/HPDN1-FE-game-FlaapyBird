import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameCanvas from '../components/game/GameCanvas';
import './GamePage.css'; 

function GamePage() {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => navigate('/homepage')} className="back-button">
        ←
      </button>
      <GameCanvas />
    </div>
  );
}

export default GamePage;
