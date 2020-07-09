import React from "react";

const Timer = ({ currentMode, currentTime }) => {
  const [mode] = currentMode;
  const [time] = currentTime;
  const seconds = time % 60;
  const minutes = Math.floor(time / 60);
  return (
    <>
      <h2 id="timer-label">{mode === "session" ? "Session" : "Break"}</h2>
      <h3 id="time-left">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </h3>
    </>
  );
};

export default Timer;
