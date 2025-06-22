// MissionItem.jsx
import React from "react";
import PropTypes from "prop-types";

const MissionItem = ({ mission, onUpdateProgress, onClaimReward }) => {
  const {
    mission_id,
    name,
    description,
    progress,
    target,
    completed,
    claimed,
    reward_gold,
  } = mission;

  // Nếu đã claim thì không render gì cả
  if (claimed) return null;

  const handleClaim = () => {
    onClaimReward(mission_id);
  };

  return (
    <li
      key={mission_id}
      style={{
        display: "flex",
        backgroundColor: '#fde68a',
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        alignItems: "center",
        minHeight: "80px",  
      }}
    >
      {/* Left 70% */}
        <div style={{ flex: 5, paddingRight: "16px", paddingBottom: "13px", paddingLeft: "30px", textAlign: "left" }}>
          <h3 style={{ color: "#333", marginBottom: "8px" }}>{name}</h3>
          <p style={{ color: "#666", marginBottom: "0" }}>{description}</p>
        </div>
        {/* Middle 20% */}   
        <div style={{ flex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#bfa100", fontWeight: "bold", fontSize: "18px", display: "flex", alignItems: "center" }}>
            <img src={require("../../assets/images/gold-icon.png")} alt="" style={{ width: "22px", height: "22px", marginRight: "6px" }} />
            {mission.reward_gold || 0}
          </span>
        </div>

        {/* Right 30% */}
      <div
        style={{
          flex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        {progress >= target ? (
          <button
            onClick={handleClaim}
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              padding: "10px 15px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4caf50")}
          >
            Claim Reward
          </button>
        ) : (
          <span style={{ color: "#555", fontWeight: "bold", fontSize: "16px" }}>
            {progress} / {target}
          </span>
        )}
      </div>
      
    </li>
  );
};

MissionItem.propTypes = {
  mission: PropTypes.object.isRequired,
  onUpdateProgress: PropTypes.func.isRequired,
  onClaimReward: PropTypes.func.isRequired,
};

export default MissionItem;
