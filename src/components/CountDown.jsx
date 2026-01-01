import { useEffect, useRef, useState } from "react";

const CountDown = () => {
  const [target, setTarget] = useState("");
  const [timeDiff, setTimeDiff] = useState(null);

  const idIntervalRef = useRef(null);
  const handleSumbit = () => {
    if (idIntervalRef.current) {
      clearInterval(idIntervalRef.current);
    }
    idIntervalRef.current = setInterval(() => {
      console.log("idIntervalRef.current", idIntervalRef.current);
      setTimeDiff(new Date(target) - new Date());
    }, 1000);
  };
  useEffect(() => {
    if (timeDiff < 0) {

      clearInterval(idIntervalRef.current);
      setTarget("")
      setTimeDiff(null);
    }
  }, [timeDiff]);
  const calculateTimeLeft = () => {
    let seconds = Math.floor(timeDiff / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let months = Math.floor(days / 30);
    //Logic -> seconds % 60 = secods after 1 min so the remainder becomes the seconds and the rest becomes the minutes.
    seconds = seconds % 60;
    //Logic -> minutes % 60 = minutes after 1 hour so the remainder becomes the minutes and the rest becomes the hours.
    minutes = minutes % 60;
    //Logic -> hours % 24 = hours after 1 day so the remainder becomes the hours and the rest becomes the days.
    hours = hours % 24;
    //Logic -> days % 30 = days after 1 month so the remainder becomes the days and the rest becomes the months.
    days = days % 30;


    return {
      days,
      minutes,
      hours,
      seconds,
      months,
    };
  };
  return (
    <>
      <h1>CountDown Timer</h1>
      <div id="input">
        <input
          id="datetime"
          type="datetime-local"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
      </div>
      <button id="submit" onClick={handleSumbit}>
        Submit
      </button>
      {timeDiff > 0 ? (
        <div id="countDown">
          <div className="time-unit">
            <span id="months">{calculateTimeLeft().months}</span>
            <small>{calculateTimeLeft().months === 1 ? "Month" : "Months"}</small>
          </div>
          <span className="separator">:</span>
          <div className="time-unit">
            <span id="days">{calculateTimeLeft().days}</span>
            <small>{calculateTimeLeft().days === 1 ? "Day" : "Days"}</small>
          </div>
          <span className="separator">:</span>
          <div className="time-unit">
            <span id="hours">{calculateTimeLeft().hours}</span>
            <small>Hours</small>
          </div>
          <span className="separator">:</span>
          <div className="time-unit">
            <span id="minutes">{calculateTimeLeft().minutes}</span>
            <small>Minutes</small>
          </div>
          <span className="separator">:</span>
          <div className="time-unit">
            <span id="seconds">{calculateTimeLeft().seconds}</span>
            <small>Seconds</small>
          </div>

        </div>
      ) : (timeDiff === 0 && target !== "" ? (
        <h1>Same Time and Date Selected</h1>
      ) : (
        timeDiff < 0 && <h1>Selected Date/Time is in the Past</h1>
      ))}
    </>
  );
};
export default CountDown;
