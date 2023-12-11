import React, { useEffect, useState } from "react";
//add a prop to this component which will be a function that toggles the timer play and pause
//this function will be called when the content is clicked

export enum TimerState {
  PLAYING,
  PAUSED,
  RESTART,
}

type TimerProps = {
  timerState: TimerState;
  time: number;
  onFinished?: () => void;
};
const TOTAL_TIME = 20000; // 20 seconds in milliseconds

const Timer: React.FC<TimerProps> = ({
  timerState,
  time = TOTAL_TIME,
  onFinished,
}) => {
  const [count, setCount] = useState(time);

  //keep the timer return from setinterval in a state
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    // setTimer(
    //   setInterval(() => {
    //     setCount((prevCount) => (prevCount > 0 ? prevCount - 100 : 0));
    //   }, 100)
    // ); // Update every 100 milliseconds (one-tenth of a second)
    // return () => clearInterval(timer);
  }, []);

  const startTimer = () => {
    setTimer(
      setInterval(() => {
        if(count === 0){
          clearInterval(timer);
          onFinished && onFinished();
          return;
        }
        setCount((prevCount) => (prevCount > 0 ? prevCount - 100 : 0));
      }, 100)
    ); // Update every 100 milliseconds (one-tenth of a second)
  };

  useEffect(() => {
    if (timerState === TimerState.PAUSED) {
      clearInterval(timer);
    } else if (timerState === TimerState.PLAYING) {
      console.log("playing");
      clearInterval(timer);
      startTimer();
    } else if (timerState === TimerState.RESTART) {
      clearInterval(timer);
      setCount(TOTAL_TIME);
      startTimer();
    }
  }, [timerState]);

  const toggle = () => {
    console.log("toggle");
  };

  // Format time as seconds:tenths of a second
  const formatCount = () => {
    const seconds = Math.floor(count / 1000);
    const tenthsOfSecond = Math.floor((count % 1000) / 100); // Only first decimal place
    return `${seconds}:${tenthsOfSecond}`;
  };

  return (
    <div>
      <h1>{formatCount()}</h1>
    </div>
  );
};

export default Timer;
