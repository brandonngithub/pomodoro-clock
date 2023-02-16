import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Break from "./components/Break";
import Session from "./components/Session";
import TimeLeft from "./components/TimeLeft";

function App() {
  const audioElement = useRef<HTMLAudioElement>(null);
  const [currentSessionType, setCurrentSessionType] = useState("Session");
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [breakLength, setBreakLength] = useState(300);
  const [sessionLength, setSessionLength] = useState(60 * 25);
  const [timeLeft, setTimeLeft] = useState(sessionLength);

  useEffect(() => {
    setTimeLeft(sessionLength);
  }, [sessionLength]);

  useEffect(() => {
    if (timeLeft == 0) {
      audioElement?.current?.play();
      if (currentSessionType == "Break") {
        setCurrentSessionType("Session");
        setTimeLeft(sessionLength);
      } else if (currentSessionType == "Session") {
        setCurrentSessionType("Break");
        setTimeLeft(breakLength);
      }
    }
  }, [currentSessionType, breakLength, sessionLength, timeLeft]);

  const decrementBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength - 60;
    if (newBreakLength > 0) {
      setBreakLength(newBreakLength);
    }
  };

  const incrementBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength + 60;
    if (newBreakLength <= 60 * 60) {
      setBreakLength(newBreakLength);
    }
  };

  const decrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength - 60;
    if (newSessionLength > 0) {
      setSessionLength(newSessionLength);
    }
  };

  const incrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength + 60;
    if (newSessionLength <= 60 * 60) {
      setSessionLength(newSessionLength);
    }
  };

  const isStarted = intervalId != null;
  const handleStartStopClick = () => {
    if (isStarted) {
      if (intervalId) {
        clearInterval(intervalId);
      }
      setIntervalId(null);
    } else {
      const newIntervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
      setIntervalId(newIntervalId);
    }
  };

  const handleResetButtonClick = () => {
    audioElement?.current?.load();
    if (intervalId) {
      clearInterval(intervalId);
    }
    setIntervalId(null);
    setCurrentSessionType("Session");
    setSessionLength(25 * 60);
    setBreakLength(5 * 60);
    setTimeLeft(25 * 60);
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-slate-700">
      <div className="flex w-full justify-around">
        <Break
          breakLength={breakLength}
          decrementBreakLengthByOneMinute={decrementBreakLengthByOneMinute}
          incrementBreakLengthByOneMinute={incrementBreakLengthByOneMinute}
        />
        <TimeLeft
          handleResetButtonClick={handleResetButtonClick}
          timerLabel={currentSessionType}
          handleStartStopClick={handleStartStopClick}
          startStopButtonLabel={isStarted ? "Stop" : "Start"}
          timeLeft={timeLeft}
        />
        <Session
          sessionLength={sessionLength}
          decrementSessionLengthByOneMinute={decrementSessionLengthByOneMinute}
          incrementSessionLengthByOneMinute={incrementSessionLengthByOneMinute}
        />
      </div>
      <audio id="beep" ref={audioElement}>
        <source
          src="https://onlineclock.net/audio/options/default.mp3"
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
}

export default App;
