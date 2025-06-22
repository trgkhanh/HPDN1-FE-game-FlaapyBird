// MissionList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import MissionItem from "./MissionItem";

const MissionList = ({ userId }) => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Lấy tất cả nhiệm vụ của người chơi từ API
    axios
      .get(`http://localhost:3001/user-missions/${userId}`)
      .then((response) => {
        setMissions(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false)
      });
  }, [userId]);

  const handleUpdateProgress = (missionId, newProgress) => {
    axios
      .post("http://localhost:3001/user-missions/update", {
        userId,
        missionId,
        progress: newProgress,
      })
      .then(() => {
        setMissions((prevMissions) =>
          prevMissions.map((mission) =>
            mission.mission_id === missionId
              ? { ...mission, progress: newProgress }
              : mission 
          )
        );
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleClaimReward = (mission_id) => {
    axios
      .post("http://localhost:3001/user-missions/claim", {
        user_id,
        mission_id,
      })
      .then((response) => {
        const reward = response.data.reward_gold;
        alert(`You received ${reward} gold!`);
        setMissions((prevMissions) =>
          prevMissions.map((mission) =>
            mission.mission_id === mission_id
              ? { ...mission, claimed: true }
              : mission
          )
        );
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div>
      <h1>Bảng nhiệm vụ</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {missions.map((mission) => (
            <MissionItem
              key={mission.mission_id}
              mission={mission}
              userId={userId}
              onUpdateProgress={handleUpdateProgress}
              onClaimReward={handleClaimReward}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MissionList;
