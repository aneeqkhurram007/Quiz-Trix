import { Button, Input, Select } from "antd";
import React, { useEffect, useState } from "react";

const AskQuestion = ({
  questionState,
  index,
  saveQuestion,
  updateQuestion,
}) => {
  const [question, setquestion] = useState("");
  const [options, setOptions] = useState({
    A: "",
    B: "",
    C: "",
    D: "",
  });
  const [disabledState, setdisabledState] = useState(
    questionState ? true : false
  );
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    if (questionState) {
      setquestion(questionState?.question);
      setOptions({ ...options, ...questionState?.options });
      setAnswer(questionState?.answer);
    }
    setdisabledState(questionState ? true : false);
  }, [questionState]);

  return (
    <form className="flex flex-col space-y-3 w-full">
      <div className="w-full">
        <label className="text-bold text-lg">Question {index}</label>
        <Input
          required
          value={question}
          placeholder="Question"
          onChange={(e) => setquestion(e.target.value)}
        />
      </div>
      <div>
        <ul>
          <li>
            <label>Option A</label>
            <Input
              required
              placeholder="Option 1"
              value={options.A}
              onChange={(e) => setOptions({ ...options, A: e.target.value })}
            />
          </li>
          <li>
            <label>Option B</label>
            <Input
              required
              placeholder="Option 2"
              value={options.B}
              onChange={(e) => setOptions({ ...options, B: e.target.value })}
            />
          </li>
          <li>
            <label>Option C</label>
            <Input
              required
              placeholder="Option 3"
              value={options.C}
              onChange={(e) => setOptions({ ...options, C: e.target.value })}
            />
          </li>
          <li>
            <label>Option D</label>
            <Input
              required
              placeholder="Option 4"
              value={options.D}
              onChange={(e) => setOptions({ ...options, D: e.target.value })}
            />
          </li>
        </ul>
      </div>
      <div className=" my-2 w-full flex justify-between">
        <label>Correct Answer</label>
        <Select
          aria-required="true"
          defaultValue={answer}
          onChange={(value) => setAnswer(value)}
        >
          <Select.Option value="A">A</Select.Option>
          <Select.Option value="B">B</Select.Option>
          <Select.Option value="C">C</Select.Option>
          <Select.Option value="D">D</Select.Option>
        </Select>
      </div>
      <div className="w-full flex">
        <Button
          type="primary"
          onClick={() =>
            saveQuestion({
              index: index,
              question,
              options,
              answer,
            })
          }
          disabled={disabledState}
          className="bg-blue-400"
        >
          Save Question
        </Button>
        <Button
          disabled={!disabledState}
          type="primary"
          onClick={() =>
            updateQuestion({
              index: index,
              question,
              options,
              answer,
            })
          }
          className="bg-blue-400 mx-4"
        >
          Update Question
        </Button>
      </div>
    </form>
  );
};

export default AskQuestion;
