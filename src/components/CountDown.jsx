import { useEffect, useRef, useState } from "react";

const CountDown = () => {
  const [target, setTarget] = useState("");
  const [timeDiff, setTimeDiff] = useState(null);

  const idIntervalRef = useRef(null);
  const handleSumbit = () => {
    if (idIntervalRef.current) {
      clearInterval(idIntervalRef.current)
    }
    idIntervalRef.current = setInterval(() => {
      console.log("idIntervalRef.current", idIntervalRef.current);
      setTimeDiff(target - new Date());
    }, 1000);
  };
  useEffect(() => {
    if (timeDiff < 0) {
      console.log("timeDiff", timeDiff);
      clearInterval(idIntervalRef.current);
    }
  }, [timeDiff]);
  const calculateTimeLeft = () => {
    const days = 1;
    const hours = 2;
    const minutes = 3;
    const seconds = 4;
    return {
      days,
      minutes,
      hours,
      seconds,
    };
  };
  return (
    <>
      <h1>CountDown Timer</h1>
      <div id="input">
        <input
          id="datetime"
          type="datetime-local"
          onChange={(e) => setTarget(new Date(e.target.value))}
        />
      </div>
      <button id="submit" onClick={handleSumbit}>
        Submit
      </button>
      {timeDiff ? (
        <div id="countDown">
          <span id="days">{calculateTimeLeft().days}</span> :
          <span id="hours">{calculateTimeLeft().hours}</span> :
          <span id="minutes"> {calculateTimeLeft().minutes}</span> :
          <span id="seconds"> {calculateTimeLeft().seconds}</span>
        </div>
      ) : timeDiff === 0 && target ? (
        <h1>Same Time and Date Selected</h1>
      ) : (
        <h1>Selected Date is in the Past</h1>
      )}
    </>
  );
};
export default CountDown;
