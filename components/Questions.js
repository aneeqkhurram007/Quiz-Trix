import { Button, Collapse, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { db } from "../firebase";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
const { Panel } = Collapse;
const Questions = ({ subject, testId, questions }) => {
  const [questionsState, setquestions] = useState([]);
  const [visible, setvisible] = useState(false);
  const [confirmLoading, setconfirmLoading] = useState(false);
  useEffect(() => {
    setquestions([...questions]);
  }, []);
  const showModal = () => {
    setvisible(true);
  };
  const updateQuestion = (state) => {
    const updatedQuestions = questionsState.map((question) => {
      if (question.index === state.index) {
        question = state;
      }
      return question;
    });
    setquestions(updatedQuestions);
  };
  const saveQuestions = async () => {
    setconfirmLoading(true);
    try {
      await updateDoc(doc(db, `subjects/${subject}/test/${testId}`), {
        questions: questionsState,
        timestamp: serverTimestamp(),
      });
      setconfirmLoading(false);
      setvisible(false);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteQuestion = async (id) => {
    const updatedQuestions = questionsState.filter(
      (question) => question.index !== id
    );
    setquestions(updatedQuestions);
  };
  const addQuestion = (state) => {
    const length = questionsState.length;
    const question = { ...state, index: length };
    const newQuestions = [...questionsState, question];
    setquestions(newQuestions);
  };
  return (
    <div>
      <Modal
        visible={visible}
        title="Add Question"
        confirmLoading={confirmLoading}
        onCancel={() => setvisible(false)}
        onOk={saveQuestions}
      >
        <Question addQuestion={addQuestion} />
      </Modal>
      <div>
        <Button
          onClick={saveQuestions}
          className="bg-blue-400 text-white"
          type="primary"
        >
          Save
        </Button>
        <Button className="bg-blue-400 mx-4" type="primary" onClick={showModal}>
          Add Question
        </Button>
      </div>
      <Collapse accordion={true}>
        {questionsState?.map((question) => (
          <Panel
            key={question.index}
            header={question.question}
            extra={
              <Button danger onClick={() => deleteQuestion(question.index)}>
                Delete
              </Button>
            }
          >
            <Question updateQuestion={updateQuestion} question={question} />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default Questions;
function Question({ question: questionProp, updateQuestion, addQuestion }) {
  const [question, setquestion] = useState("");
  const [options, setOptions] = useState({});
  const [answer, setAnswer] = useState("");
  const [disabledState, setdisabledState] = useState(false);
  useEffect(() => {
    if (questionProp) {
      setquestion(questionProp.question);
      setOptions(questionProp.options);
      setAnswer(questionProp.answer);
      setdisabledState(true);
    }
  }, [questionProp]);

  return (
    <form className="flex flex-col space-y-3 w-full">
      <div className="w-full">
        <label className="text-bold text-lg">
          Question {questionProp && questionProp.index}
        </label>
        <Input
          disabled={disabledState}
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
              disabled={disabledState}
              placeholder="Option 1"
              value={options.A}
              onChange={(e) => setOptions({ ...options, A: e.target.value })}
            />
          </li>
          <li>
            <label>Option B</label>
            <Input
              required
              disabled={disabledState}
              placeholder="Option 2"
              value={options.B}
              onChange={(e) => setOptions({ ...options, B: e.target.value })}
            />
          </li>
          <li>
            <label>Option C</label>
            <Input
              required
              disabled={disabledState}
              placeholder="Option 3"
              value={options.C}
              onChange={(e) => setOptions({ ...options, C: e.target.value })}
            />
          </li>
          <li>
            <label>Option D</label>
            <Input
              required
              disabled={disabledState}
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
          disabled={disabledState}
          aria-required="true"
          value={answer}
          onChange={(value) => setAnswer(value)}
        >
          <Select.Option value="A">A</Select.Option>
          <Select.Option value="B">B</Select.Option>
          <Select.Option value="C">C</Select.Option>
          <Select.Option value="D">D</Select.Option>
        </Select>
      </div>
      <div className="w-full flex">
        {questionProp ? (
          <>
            <Button
              type="primary"
              onClick={() => {
                updateQuestion({
                  index: questionProp.index,
                  question,
                  options,
                  answer,
                });
                setdisabledState(true);
              }}
              disabled={disabledState}
              className="bg-blue-400"
            >
              Update Question
            </Button>
            <Button
              disabled={!disabledState}
              type="primary"
              onClick={() => setdisabledState(false)}
              className="bg-blue-400 mx-4"
            >
              Edit Question
            </Button>
          </>
        ) : (
          <Button
            type="primary"
            className="bg-blue-400 mx-4"
            onClick={() => {
              addQuestion({
                question,
                options,
                answer,
              });
              setdisabledState(true);
            }}
          >
            Save Question
          </Button>
        )}
      </div>
    </form>
  );
}
