import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LeaderboardTable.css";

const LeaderboardTable = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State để lưu lỗi

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("http://localhost:3001/scores"); // Đơn giản hóa URL
        setLeaderboard(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy bảng xếp hạng:", err);
        setError("Không thể tải bảng xếp hạng. Vui lòng thử lại sau."); // Set thông báo lỗi
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankDisplay = (index) => {
    const trophies = ["🏆", "🥈", "🥉"];
    return (
      <div className="rank-cell">{index < 3 ? trophies[index] : index + 1}</div>
    );
  };

  if (loading) return <p className="loading">⏳ Đang tải bảng xếp hạng...</p>;
  if (error) return <p className="error">{error}</p>; // Hiển thị thông báo lỗi

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">🏆 Bảng xếp hạng</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Người chơi</th>
            <th>Điểm</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={user.telegram_id}>
              <td className="rank">{getRankDisplay(index)}</td>
              <td className="player" >
                <img src={user.avatar} alt={user.name} className="avatar" />
                {user.name }
              </td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
