import React, { useEffect, useState } from "react";
import styles from "./Quiz.module.css";
import Timer, { TimerState } from "../Timer";
import clsx from "clsx";
import { set } from "firebase/database";

//make a question type with the answers and the correct answer
export type QuestionResponse = {
  questions: Question[];
};

export type Question = {
  question: string;
  answers: string[];
  correctAnswer: string;
};

const Quiz = () => {
  const [timerState, setTimerState] = React.useState(TimerState.PAUSED); // ["playing", "paused", "restart"
  const [time, setTime] = React.useState(20000); // [milliseconds]
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionResponse, setQuestionResponse] = useState<QuestionResponse>();
  const [questions, setQuestions] = useState<Question[]>();
  const [isWaitingState, setIsWaitingState] = useState(false); // [milliseconds

  const [correctAnswers, setCorrectAnswers] = useState(0); //
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [lives, setLives] = useState(5);

  // get highscore from local storage
  const getHighScore = () => {
    const highScore = localStorage.getItem("highScore");
    if (highScore) {
      return parseInt(highScore);
    }
    return 0;
  };

  // set highscore to local storage
  const setHighScore = (score: number) => {
    localStorage.setItem("highScore", score.toString());
  };

  // update highscore if needed
  const checkAndUpdateHighScore = () => {
    if (correctAnswers > getHighScore()) {
      setHighScore(correctAnswers);
    }
  };

  const handleAnswerClicked = (answer: string) => {
    if (!questions || time === 0) return;
    setSelectedAnswer(answer);

    if (questionIndex === questions.length - 1) {
      checkAndUpdateHighScore();
      setTime(0);
      return;
    }

    if (!isWaitingState) {
      setTimerState(TimerState.PAUSED);
      setIsWaitingState(true);

      if (answer === questions[questionIndex].correctAnswer) {
        setCorrectAnswers(() => correctAnswers + 1);
      } else {
        setLives(lives - 1);
        if (lives === 0) {
          checkAndUpdateHighScore();
          setTime(0);
          return;
        }
      }
    } else if (isWaitingState) {
      if (questionIndex === questions.length - 1) {
        checkAndUpdateHighScore();
        setTime(0);
        return;
      }
      setQuestionIndex(questionIndex + 1);
      setIsWaitingState(false);
      setTimerState(TimerState.PLAYING);
    } else {
      console.log("wrong");
    }

    // if (time === 0) {
    //   setTime(20000);
    //   setTimerState(TimerState.RESTART);
    //   return;
    // }

    // if (timerState === TimerState.PAUSED) {
    //   console.log("play");
    //   setTimerState(TimerState.PLAYING);
    // } else if (timerState === TimerState.PLAYING) {
    //   setTimerState(TimerState.PAUSED);
    // } else if (timerState === TimerState.RESTART) {
    //   setTimerState(TimerState.PLAYING);
    // }
    // console.log("content clicked");
  };

  const handleOnFinished = () => {
    console.log("finished");
    setTime(0);
  };

  const heartsDisplay = () => {
    if (lives === 5) {
      return <h4>♥♥♥♥♥♥</h4>;
    } else if (lives === 4) {
      return <h4>♥♥♥♥♥</h4>;
    } else if (lives === 3) {
      return <h4>♥♥♥♥</h4>;
    } else if (lives === 2) {
      return <h4>♥♥♥</h4>;
    } else if (lives === 1) {
      return <h4>♥♥</h4>;
    } else if (lives === 0) {
      return <h4>♥</h4>;
    } else {
      return <h4>GAME OVER</h4>;
    }
  };

  useEffect(() => {
    async function fetchQuizData(): Promise<QuestionResponse> {
      try {
        const response = await fetch("https://api.pangreeks.rasidev.com/quiz");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error("Fetching quiz data failed:", error);
        return { questions: [] };
      }
    }

    fetchQuizData().then((data: QuestionResponse) => {
      console.log(data); // Do something with the quiz data
      setQuestionResponse(data);
      // shuffle data.questions array
      const shuffledQuestions = data.questions.sort(() => Math.random() - 0.5);

      setQuestions(shuffledQuestions);
      console.log("aa", questions);
      setTimerState(TimerState.PLAYING);
    });
  }, []);

  const shuffle = (array: any[]) => {
    array.sort(() => Math.random() - 0.5);
  };

  if (questions) {
    console.log(questions[questionIndex]);
  }

  const quiz = (
    <div
      className={styles.quizContainer}
      onClick={() => {
        if (isWaitingState) {
          setQuestionIndex(questionIndex + 1);
          setIsWaitingState(false);
          setTimerState(TimerState.PLAYING);
        }
      }}
    >
      <div className={styles.timer}>
        {time !== 0 && (
          <Timer
            onFinished={handleOnFinished}
            time={time}
            timerState={timerState}
          />
        )}
        {time === 0 && <h1>-</h1>}
      </div>
      {/* add a restart icon  */}
      <div className={styles.restart}>
        <button
          onClick={() => {
            setTime(20000);
            setTimerState(TimerState.RESTART);
            setCorrectAnswers(0);
            if (!questions) return;
            //shuffle questions
            const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
            setQuestions(shuffledQuestions);
            setQuestionIndex(0);
            setLives(5);
          }}
        >
          Restart
        </button>
      </div>

      <div className={styles.score}>
        <h4>Score: {correctAnswers}</h4>
        <h4 className={styles.highScore} >Highscore: {getHighScore()}</h4>
        {/* show dots instead of live numbers */}
        {heartsDisplay()}
      </div>
      <div>
        {questions && (
          <div className={styles.questionContainer}>
            <h1 className={styles.questionText}>
              {questions[questionIndex].question}
            </h1>
            {questions[questionIndex].answers.map((answer, index) => (
              <button
                className={clsx({
                  [styles.answerOption]: true,
                  [styles.lightGreenButton]:
                    isWaitingState &&
                    answer === questions[questionIndex].correctAnswer,
                  [styles.lightRedButton]:
                    isWaitingState &&
                    selectedAnswer === answer &&
                    answer !== questions[questionIndex].correctAnswer,
                })}
                key={index}
                onClick={() => {
                  handleAnswerClicked(answer);
                }}
              >
                {answer}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  return quiz;
};

export default Quiz;

//based on the question response type give me some mock data below
const mockQuestionResponse: QuestionResponse = {
  questions: [
    {
      question: "What is the capital of France?",
      answers: ["Paris", "Berlin", "Rome", "London"],
      correctAnswer: "Paris",
    },
    {
      question: "Who is CEO of Tesla?",
      answers: ["Jeff Bezos", "Elon Musk", "Bill Gates", "Tony Stark"],
      correctAnswer: "Elon Musk",
    },
    {
      question: "The iPhone was created by which company?",
      answers: ["Apple", "Intel", "Amazon", "Microsoft"],
      correctAnswer: "Apple",
    },
    {
      question: "How many Harry Potter books are there?",
      answers: ["1", "4", "6", "7"],
      correctAnswer: "7",
    },
  ],
};
