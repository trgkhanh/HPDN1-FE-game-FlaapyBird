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
  } = mission;

  const handleProgressChange = (e) => {
    const newProgress = parseInt(e.target.value, 10);
    onUpdateProgress(mission_id, newProgress);
  };

  const handleClaim = () => {
    onClaimReward(mission_id);
  };

  return (
    <li key={mission_id}>
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>
          Progress: {progress} / {target}
        </p>
        <input
          type="number"
          value={progress}
          onChange={handleProgressChange}
          max={target}
          min={0}
        />
        {completed ? (
          claimed ? (
            <p>Reward Claimed ✅</p>
          ) : (
            <button onClick={handleClaim}>Claim Reward</button>
          )
        ) : (
          <p>Keep going!</p>
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
