import React, { useEffect, useState } from "react";
import { XIcon, CheckIcon } from "@heroicons/react/solid";
import { db } from "../firebase";
import { arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";

const Result = ({ subject, userId, questions, answers, testName }) => {
  const [score, setscore] = useState(0);
  const [answersArray, setAnswersArray] = useState(answers.length <= 0 ? Array(questions.length).fill("NotSelected") : answers)
  useEffect(() => {
    let answersArr = answersArray;
    const arrayDifference = questions.length - answersArray.length
    if (arrayDifference > 0) {
      for (let index = 0; index < arrayDifference; index++) {
        answersArr = [...answersArr, "NotSelected"]
      }
    }
    let score = 0;
    const result = questions.map((question, index) => {
      score = question.answer == answersArr[index] ? score + 1 : score;
      return {
        question: question.question,
        correctAnswer: question.answer,
        selectedAnswer: answersArr[index],
      };
    });
    async function updateResult() {
      try {
        await updateDoc(doc(db, `users/${userId}`), {
          testResults: arrayUnion({
            subject,
            testName,
            result,
            score,
            percentage: score / questions.length,
          },
          )
        });
      } catch (error) {
        console.log(error);
      }
    }
    updateResult();
  }, []);

  return (
    <div className="px-10">
      <h1 className="text-4xl font-semibold">Result</h1>
      <ul className="text-2xl mt-10 flex flex-col space-y-10">
        {questions?.map((question, index) => (
          <li className="font-semibold" key={index}>
            <p>Question: {question.question}</p>
            <p>Correct answer: {question.answer}</p>
            <p>Your answer: {answersArray[index]}</p>
            {question.answer === answersArray[index] ? (
              <CheckIcon className="text-green-700 h-12" />
            ) : (
              <XIcon className="text-red-700 h-12" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Result;
