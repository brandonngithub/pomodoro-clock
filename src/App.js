import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Break from "./components/Break";
import Session from "./components/Session";
import TimeLeft from "./components/TimeLeft";

function App() {
  const audioElement = useRef(null);
  const [currentSessionType, setCurrentSessionType] = useState("Session");
  const [intervalId, setIntervalId] = useState(null);
  const [breakLength, setBreakLength] = useState(300);
  const [sessionLength, setSessionLength] = useState(60 * 25);
  const [timeLeft, setTimeLeft] = useState(sessionLength);

  useEffect(() => {
    setTimeLeft(sessionLength);
  }, [sessionLength]);

  const decrementBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength - 60;
    if (newBreakLength > 0) {
      setBreakLength(newBreakLength);
    }
  };

  const incrementBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength + 60;
    if (newBreakLength <= 60 * 60) {
      setBreakLength(newBreakLength)
    }
  };

  const decrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength - 60;
    if (newSessionLength > 0) {
      setSessionLength(newSessionLength);
    }
  };

  const incrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength + 60
    if (newSessionLength <= 60 * 60){
      setSessionLength(newSessionLength)
    }
  };

  const isStarted = intervalId != null;
  const handleStartStopClick = () => {
    if (isStarted) {
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      const newIntervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = prevTimeLeft - 1;
          if (newTimeLeft >= 0) {
            return newTimeLeft;
          }

          audioElement.current.play();

          if (currentSessionType === "Session") {
            setCurrentSessionType("Break");
            return breakLength;
          } else if (currentSessionType === "Break") {
            setCurrentSessionType("Session");
            return sessionLength;
          }
        });
      }, 100);
      setIntervalId(newIntervalId);
    }
  };

  const handleResetButtonClick = () => {
    audioElement.current.load()
    clearInterval(intervalId);
    setIntervalId(null);
    setCurrentSessionType("Session");
    setSessionLength(25 * 60);
    setBreakLength(5 * 60);
    setTimeLeft(25 * 60);
  };

  return (
    <div className="App">
      <Break
        breakLength={breakLength}
        decrementBreakLengthByOneMinute={decrementBreakLengthByOneMinute}
        incrementBreakLengthByOneMinute={incrementBreakLengthByOneMinute}
      />
      <TimeLeft
        timerLabel={currentSessionType}
        handleStartStopClick={handleStartStopClick}
        startStopButtonLabel={isStarted? "Stop" : "Start"}
        timeLeft={timeLeft}
      />
      <Session
        sessionLength={sessionLength}
        decrementSessionLengthByOneMinute={decrementSessionLengthByOneMinute}
        incrementSessionLengthByOneMinute={incrementSessionLengthByOneMinute}
      />
      <button id="reset" onClick={handleResetButtonClick}>
        Reset
      </button>
      <audio id="beep" ref={audioElement}>
        <source src="https://onlineclock.net/audio/options/default.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;
