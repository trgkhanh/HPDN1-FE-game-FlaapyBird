import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import spriteSrc from "../../assets/images/sprite.png";
import boardSrc from "../../assets/images/board.png";
import startSrc from "../../assets/images/start.png";
import flappybirdSrc from "../../assets/images/flappybird.png";
import MissionIconSrc from "../../assets/images/MissionIcon.png";

const GameHome = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

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
        ctx.drawImage(missionIcon, canvas.width / 2 - 241, 650, 51, 50); // Adjusted position
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

    function draw() {
      bg.draw();

      drawArrGround();
      start.draw();
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      draw();
    }

    sprites.onload = () => animate();
    missionIcon.onload = () => animate(); // Ensure missionIcon is loaded before animating

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
    });
  }, [navigate]);

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
