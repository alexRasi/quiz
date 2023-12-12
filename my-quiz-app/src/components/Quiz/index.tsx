import React from "react";
import styles from "./Quiz.module.css";
import Timer, { TimerState } from "./Timer";

const Quiz = () => {
  const [timerState, setTimerState] = React.useState(TimerState.PAUSED); // ["playing", "paused", "restart"
  const [time, setTime] = React.useState(20000); // [milliseconds]
  const contentClicked = () => {
    if (time === 0) {
      setTime(20000);
      setTimerState(TimerState.RESTART);
      return;
    }

    if (timerState === TimerState.PAUSED) {
      console.log("play");
      setTimerState(TimerState.PLAYING);
    } else if (timerState === TimerState.PLAYING) {
      setTimerState(TimerState.PAUSED);
    } else if (timerState === TimerState.RESTART) {
      setTimerState(TimerState.PLAYING);
    }
    console.log("content clicked");
  };

  const handleOnFinished = () => {
    console.log("finished");
    setTime(0);
  };
  return (
    <div className={styles.quizContainer}>
      <Timer onFinished={handleOnFinished} time={time} timerState={timerState}/>
      <h1>pangreeks</h1>
       
      <div className={styles.content} onClick={()=>{contentClicked()}}>content</div>
    </div>
  );
};

export default Quiz;
