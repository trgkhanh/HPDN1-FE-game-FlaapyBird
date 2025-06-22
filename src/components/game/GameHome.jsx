import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import spriteSrc from "../../assets/images/sprite.png";
import boardSrc from "../../assets/images/board.png";
import startSrc from "../../assets/images/start.png";
import flappybirdSrc from "../../assets/images/flappybird.png";
import MissionIconSrc from "../../assets/images/MissionIcon.png";
import avatarSrc from "../../assets/images/da621058a899abf368f96c11451788bf~tplv-tiktokx-cropcenter_1080_1080.jpeg"; // Thêm ảnh avatar của bạn vào assets/images
import goldSrc from "../../assets/images/gold-icon.png"; // Thêm ảnh icon vàng nếu cần
import { useUser } from "../../Contexts/userContext.jsx"; // Giả sử bạn có context để quản lý user

// Hàm gọi API lấy user theo id
async function getUserById(userId) {
  try {
    const response = await fetch(`http://localhost:3001/users/${userId}`);
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Không tìm thấy user");
    }
    const data = await response.json();
    console.log("User data:1111111111", data);
    return data;
  } catch (error) {
    console.error("Lỗi lấy user:", error.message);
    throw error;
  }
}

const GameHome = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useUser();
  console.log("User context:", user);
  const [userData, setUserData] = useState(null);
  console.log("User data:2", userData);

  useEffect(() => {
    getUserById(user.telegram_id)
      .then((data) => setUserData(data))
      .catch((err) => console.error(err));
  }, [user]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 530;
    canvas.height = 710;

    const sprites = new Image();
    sprites.src = spriteSrc;

    const board = new Image();
    board.src = boardSrc;

    const starton = new Image();
    starton.src = startSrc;

    const flappybird = new Image();
    flappybird.src = flappybirdSrc;

    const missionIcon = new Image();
    missionIcon.src = MissionIconSrc;

    const avatar = new Image();
    avatar.src = user?.avatar || avatarSrc; // Sử dụng ảnh avatar từ user context hoặc ảnh mặc định

    const start = {
      draw: function () {
        ctx.beginPath();
        ctx.drawImage(flappybird, canvas.width / 2 - flappybird.width / 2, 100);
        ctx.drawImage(
          starton,
          canvas.width / 2 - starton.width / 2,
          400,
          216,
          76
        );
        ctx.drawImage(board, canvas.width / 2 + 190, 650, 51, 50);
        ctx.drawImage(missionIcon, canvas.width / 2 - 241, 650, 51, 50);
      },
    };

    const bg = {
      sX: 165,
      sY: 0,
      sW: 226,
      sH: 625,
      cX: 0,
      cY: 0,
      cW: 226,
      cH: 625,
      draw: function () {
        ctx.beginPath();
        ctx.drawImage(
          sprites,
          this.sX,
          this.sY,
          this.sW,
          this.sH,
          this.cX,
          this.cY,
          this.cW,
          this.cH
        );
        ctx.drawImage(
          sprites,
          this.sX,
          this.sY,
          this.sW,
          this.sH,
          this.cX + 226,
          this.cY,
          this.cW,
          this.cH
        );
        ctx.drawImage(
          sprites,
          this.sX,
          this.sY,
          this.sW,
          this.sH,
          this.cX + 452,
          this.cY,
          this.cW,
          this.cH
        );
      },
    };

    class Ground {
      constructor(cX, cY) {
        this.cX = cX;
        this.cY = cY;
        this.sX = 628;
        this.sY = 0;
        this.sW = 214;
        this.sH = 143;
        this.cW = 230;
        this.cH = 143;
      }
      draw() {
        ctx.beginPath();
        ctx.drawImage(
          sprites,
          this.sX,
          this.sY,
          this.sW,
          this.sH,
          this.cX,
          this.cY,
          this.cW,
          this.cH
        );
      }
    }

    let arrGround = [];
    for (let i = 0; i < 4; i++) {
      let ground = new Ground(230 * i, 625);
      arrGround.push(ground);
    }

    function drawArrGround() {
      arrGround.forEach((ground) => ground.draw());
    }

    // Vẽ thanh ngang trên cùng
    function drawTopBar() {
      // Thanh nền
      ctx.save();
      ctx.fillStyle = "#fff";
      ctx.globalAlpha = 0.85;
      ctx.fillRect(0, 0, canvas.width, 60);
      ctx.globalAlpha = 1;
      ctx.restore();

      // Avatar
      ctx.save();
      ctx.beginPath();
      ctx.arc(35, 30, 24, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(avatar, 11, 6, 48, 48);
      ctx.restore();

      // Tên người chơi
      ctx.font = "bold 18px Arial";
      ctx.fillStyle = "#222";
      ctx.textBaseline = "middle";
      ctx.fillText(userData?.name || 1, 70, 30);

      // Số vàng (icon vàng + số)
      // Vẽ icon vàng (dùng emoji hoặc ảnh nếu có)
      ctx.font = "20px Arial";
      ctx.fillStyle = "#FFD700";
      ctx.fillText("💰", canvas.width - 110, 30);

      ctx.font = "bold 18px Arial";
      ctx.fillStyle = "#222";
      ctx.fillText(userData?.gold ?? 0, canvas.width - 80, 30);

      // Icon đăng xuất (emoji 🚪)
      ctx.font = "24px Arial";
      ctx.fillText("🚪", canvas.width - 40, 30);
    }

    function draw() {
      bg.draw();
      drawArrGround();
      start.draw();
      drawTopBar();
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      draw();
    }

    sprites.onload = () => animate();
    missionIcon.onload = () => animate();
    avatar.onload = () => animate();

    canvas.addEventListener("click", (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // startstart
      const startX = canvas.width / 2 - 108; // 216 / 2
      const startY = 400;
      const startW = 216;
      const startH = 76;

      //  nút Bảng xếp hạng
      const boardX = canvas.width / 2 + 190;
      const boardY = 650;
      const boardW = 51;
      const boardH = 50;

      //  nút MissionIcon
      const missionX = canvas.width / 2 - 241;
      const missionY = 650;
      const missionW = 51;
      const missionH = 50;

      // Kiểm tra click vào nút Start
      if (
        x >= startX &&
        x <= startX + startW &&
        y >= startY &&
        y <= startY + startH
      ) {
        navigate("/game");
      }

      // Kiểm tra click vào nút Leaderboard
      if (
        x >= boardX &&
        x <= boardX + boardW &&
        y >= boardY &&
        y <= boardY + boardH
      ) {
        navigate("/leaderboard");
      }

      //Kiểm tra click vào nút MissionIcon
      if (
        x >= missionX &&
        x <= missionX + missionW &&
        y >= missionY &&
        y <= missionY + missionH
      ) {
        navigate("/missionboard");
      }

      // Icon đăng xuất (tọa độ)
      const logoutX = canvas.width - 55;
      const logoutY = 10;
      const logoutW = 40;
      const logoutH = 40;

      if (
        x >= logoutX &&
        x <= logoutX + logoutW &&
        y >= logoutY &&
        y <= logoutY + logoutH
      ) {
        // Xử lý đăng xuất: ví dụ xóa token, chuyển về login
        // localStorage.removeItem("token");
        navigate("/");
      }
    });
  }, [navigate, userData]);

  return (
    <canvas
      ref={canvasRef}
      className="canvas block mx-auto bg-sky-100"
      width={530}
      height={710}
    />
  );
};

export default GameHome;
