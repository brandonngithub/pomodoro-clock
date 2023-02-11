import React, { useState, useEffect } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment)

const TimeLeft = (props) => {
    const {
        sessionLength,
        breakLength,
    } = props;

    const [currentSessionType, setCurrentSessionType] = useState('Session');
    const [intervalId, setIntervalId] = useState(null);
    const [timeLeft, setTimeLeft] = useState(sessionLength);

    // change timeLeft whenever sessionLength changes
    useEffect(() => {
        setTimeLeft(sessionLength);
    }, [sessionLength]);

    const isStarted = intervalId != null;
    const handleStartStopClick = () => {
        if (isStarted) {
            // use start button as stop button if timer running using clearInterval
            clearInterval(intervalId);
            setIntervalId(null);
        } else {
            // decrement timeLeft by one every second (1000ms) using setInterval
            const newIntervalId = setInterval(() => {
                setTimeLeft(prevTimeLeft => {
                    const newTimeLeft = prevTimeLeft - 1;
                    if (newTimeLeft >= 0) {
                        return prevTimeLeft - 1;
                    }
                    // if session switch the break and vice versa
                    if (currentSessionType == 'Session') {
                        setCurrentSessionType('Break');
                        setTimeLeft(breakLength);
                    } else if (currentSessionType == 'Break') {
                        setCurrentSessionType('Session');
                        setTimeLeft(sessionLength);
                    }
                });
            }, 1000);
            setIntervalId(newIntervalId);
        }
    }

    const formattedTimeLeft = moment.duration(timeLeft, 's').format('mm:ss', { trim: false });
    return (
        <div>
            <p id="timer-label">{currentSessionType}</p>
            <p id="time-left">{formattedTimeLeft}</p>
            <button onClick={handleStartStopClick}>{isStarted? 'Stop' : 'Start'}</button>
        </div>
    )
}

export default TimeLeft;