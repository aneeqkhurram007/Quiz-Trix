import React, { useEffect, useState } from "react";
import { XIcon, CheckIcon } from "@heroicons/react/solid";
import { db } from "../firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

const Result = ({ subject, userId, questions, answers }) => {
  const [score, setscore] = useState(0);
  useEffect(() => {
    let score = 0;
    const result = questions.map((question, index) => {
      question.answer == answers[index] ? score + 1 : score;
      return {
        question: question.question,
        correctAnswer: question.answer,
        selectedAnswer: answers[index],
      };
    });
    async function updateResult() {
      try {
        await updateDoc(doc(db, `users/${userId}`), {
          [subject]: {
            result,
            score,
            percentage: score / questions.length,
            timestamp: serverTimestamp(),
          },
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
            <p>Your answer: {answers[index]}</p>
            {question.answer === answers[index] ? (
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
