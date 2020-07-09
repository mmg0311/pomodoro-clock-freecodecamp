import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import { useInterval } from "./useInterval";

import TimeSet from "./TimeSet";
import Timer from "./Timer";
import Controls from "./Controls";

const App = () => {
  const [breakVal, setBreakVal] = useState(5);
  const [sessionVal, setSessionVal] = useState(25);
  const [mode, setMode] = useState("session");
  const [time, setTime] = useState(sessionVal * 60);
  const [active, setActive] = useState(false);
  const beep = useRef();

  useInterval(() => setTime(time - 1), active ? 1000 : null);

  useEffect(() => {
    setTime(sessionVal * 60);
  }, [sessionVal]);

  useEffect(() => {
    if (time === 0 && mode === "session") {
      beep.current.play();
      setMode("break");
      setTime(breakVal * 60);
    } else if (time === 0 && mode === "break") {
      beep.current.play();
      setMode("session");
      setTime(sessionVal * 60);
    }
  }, [time, breakVal, sessionVal, mode]);

  const handleReset = () => {
    beep.current.pause();
    beep.current.currentTime = 0;
    setActive(false);
    setMode("session");
    setBreakVal(5);
    setSessionVal(25);
    setTime(25 * 60);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="box left">
          <TimeSet type={"Break"} value={[breakVal, setBreakVal]} />
        </div>
        <div className="box right">
          <TimeSet type={"Session"} value={[sessionVal, setSessionVal]} />
        </div>
      </div>
      <div className="time">
        <Timer currentMode={[mode, setMode]} currentTime={[time, setTime]} />
      </div>
      <Controls activeStatus={[active, setActive]} handleReset={handleReset} />
      <audio
        id="beep"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        ref={beep}
      />
    </div>
  );
};

export default App;
