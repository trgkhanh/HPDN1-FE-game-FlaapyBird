import React from "react";
import MissionBoard from "../components/missions/MissionList.jsx";
import MissionList from "../components/missions/MissionList.jsx";
// import { useTelegram } from '../telegram';

export default function MissionsBoardPage() {
  // const { user } = useTelegram(); // lấy telegram_id
  const userId = 1;
  return (
    <div>
      <MissionList userId={userId} />
      {/* <MissionList telegramId={user?.id} /> */}
    </div>
  );
}
