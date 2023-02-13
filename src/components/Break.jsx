import moment from "moment";
import React from "react";
import { BreakSessionContainer } from "../ui/BreakSessionUi";
import { BreakSessionLabel } from "../ui/BreakSessionUi";
import { BreakSessionTime } from "../ui/BreakSessionUi";
import { PlusMinusButtonContainer } from "../ui/BreakSessionUi";
import { PlusMinusButton } from "../ui/BreakSessionUi";

const Break = (props) => {
  const {
    breakLength,
    decrementBreakLengthByOneMinute,
    incrementBreakLengthByOneMinute,
  } = props;

  const breakLengthInMinutes = moment.duration(breakLength, "s").minutes();
  return (
    <BreakSessionContainer>
      <BreakSessionLabel id="break-label">Break</BreakSessionLabel>
      <BreakSessionTime id="break-length">
        {breakLengthInMinutes}
      </BreakSessionTime>
      <PlusMinusButtonContainer>
        <PlusMinusButton
          id="break-decrement"
          onClick={decrementBreakLengthByOneMinute}
        >
          -
        </PlusMinusButton>
        <PlusMinusButton
          id="break-increment"
          onClick={incrementBreakLengthByOneMinute}
        >
          +
        </PlusMinusButton>
      </PlusMinusButtonContainer>
    </BreakSessionContainer>
  );
};

export default Break;
