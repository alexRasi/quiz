import React, { useEffect, useState } from "react";
import styles from "./Quiz.module.css";
import Timer, { TimerState } from "../Timer";

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

  const contentClicked = () => {
    // fetch the questions from server

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

  async function fetchQuizData() {
    try {
      // const response = await fetch('http://38.242.141.80:3000/quiz'); // Replace with your server's IP and the correct port
      const response = await fetch("https://services.rasidev.com/quiz"); // Replace with your server's IP and the correct port

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Fetching quiz data failed:", error);
    }
  }

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
      setQuestions(data.questions);
      console.log("aa", questions);
    });
  }, []);

  if (questions) {
    console.log(questions[questionIndex]);
  }
  return (
    <div className={styles.quizContainer}>
      <Timer
        onFinished={handleOnFinished}
        time={time}
        timerState={timerState}
      />
      <div
        className={styles.content}
        onClick={() => {
          contentClicked();
        }}
      >
        {questions && (
          <div>
            <h1>{questions[questionIndex].question}</h1>
            {questions[questionIndex].answers.map((answer, index) => (
              <h2 key={index} onClick={() => {
                if (answer === questions[questionIndex].correctAnswer) {
                  setQuestionIndex(questionIndex + 1);
                  console.log("correct");
                } else {
                  console.log("wrong");
                }
              }}>{answer}</h2>
            ))}
          </div>
        )}
      </div>
    </div>
  );
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
