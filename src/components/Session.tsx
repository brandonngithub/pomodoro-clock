import React from "react";
import moment from "moment";
import { BreakSessionContainer, BreakSessionLabel, BreakSessionTime } from "../ui/BreakSessionUi";
import { PlusMinusButtonContainer, PlusMinusButton } from "../ui/BreakSessionUi";

const Session: React.FC<Props> = (props) => {
  const {
    sessionLength,
    decrementSessionLengthByOneMinute,
    incrementSessionLengthByOneMinute,
  } = props;

  const sessionLengthInMinutes = moment.duration(sessionLength, "s").asMinutes();
  
  return (
    <BreakSessionContainer>
      <BreakSessionLabel id="session-label">Session</BreakSessionLabel>
      <BreakSessionTime id="session-length">{sessionLengthInMinutes}</BreakSessionTime>
      <PlusMinusButtonContainer>
        <PlusMinusButton id="session-decrement" onClick={decrementSessionLengthByOneMinute}>-</PlusMinusButton>
        <PlusMinusButton id="session-increment" onClick={incrementSessionLengthByOneMinute}>+</PlusMinusButton>
      </PlusMinusButtonContainer>
    </BreakSessionContainer>
  );
};

type Props = {
  sessionLength: number
  decrementSessionLengthByOneMinute: () => void
  incrementSessionLengthByOneMinute: () => void
}

export default Session;
