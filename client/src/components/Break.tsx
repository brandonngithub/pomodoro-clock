import moment from "moment";
import React from "react";
import { BreakSessionContainer, BreakSessionLabel, BreakSessionTime } from "../ui/BreakSessionUi";
import { PlusMinusButtonContainer, PlusMinusButton } from "../ui/BreakSessionUi";

const Break: React.FC<Props> = (props) => {
  const {
    breakLength,
    decrementBreakLengthByOneMinute,
    incrementBreakLengthByOneMinute,
  } = props;

  const breakLengthInMinutes = moment.duration(breakLength, "s").minutes();

  return (
    <BreakSessionContainer>
      <BreakSessionLabel id="break-label">Break</BreakSessionLabel>
      <BreakSessionTime id="break-length">{breakLengthInMinutes}</BreakSessionTime>
      <PlusMinusButtonContainer>
        <PlusMinusButton id="break-decrement" onClick={decrementBreakLengthByOneMinute}>-</PlusMinusButton>
        <PlusMinusButton id="break-increment" onClick={incrementBreakLengthByOneMinute}>+</PlusMinusButton>
      </PlusMinusButtonContainer>
    </BreakSessionContainer>
  );
};

type Props = {
  breakLength: number
  decrementBreakLengthByOneMinute: () => void
  incrementBreakLengthByOneMinute: () => void
}

export default Break;
