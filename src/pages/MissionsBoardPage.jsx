import React from "react";
import MissionBoard from "../components/missions/MissionList.jsx";
import MissionList from "../components/missions/MissionList.jsx";
// import { useTelegram } from '../telegram';
import { useUser } from "../Contexts/userContext.jsx";

export default function MissionsBoardPage() {
  // const { user } = useTelegram(); // lấy telegram_id
  const { user } = useUser();
  console.log("userContext:", user);
  const userId = user.telegram_id;
  console.log("MissionsBoardPage userId:", userId);
  return (
    <div>
      <MissionList userId={userId} />
      {/* <MissionList telegramId={user?.id} /> */}
    </div>
  );
}
