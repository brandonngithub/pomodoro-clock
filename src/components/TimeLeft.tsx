import React from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

// @ts-ignore
momentDurationFormatSetup(moment);

const TimeLeft: React.FC<Props> = (props) => {
  const {
    handleResetButtonClick,
    handleStartStopClick,
    timerLabel,
    startStopButtonLabel,
    timeLeft,
  } = props;

  const formattedTimeLeft = moment.duration(timeLeft, "s").format("mm:ss", { trim: false });

  return (
    <div className="flex flex-col justify-evenly items-center w-64 h-64 bg-slate-400 rounded-lg">
      <p className="text-slate-900 text-2xl" id="timer-label">
        {timerLabel}
      </p>
      <p className="text-4xl font-bold" id="time-left">
        {formattedTimeLeft}
      </p>
      <button
        className="text-slate-400 font-semibold bg-slate-900 px-4 py-2 rounded-lg"
        onClick={handleStartStopClick}
      >
        {startStopButtonLabel}
      </button>
      <button
        className="border-2 text-slate-900 rounded-lg border-slate-900 border-solid px-3 py-2"
        id="reset"
        onClick={handleResetButtonClick}
      >
        Reset
      </button>
    </div>
  );
};

type Props = {
  handleResetButtonClick: () => void;
  handleStartStopClick: () => void;
  timerLabel: string;
  startStopButtonLabel: string;
  timeLeft: number;
};

export default TimeLeft;
