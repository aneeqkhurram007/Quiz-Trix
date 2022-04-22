import React, { useState } from "react";
import { XIcon, CheckIcon } from "@heroicons/react/solid";
const Result = ({ questions, answers }) => {
  const [score, setscore] = useState(0);
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
