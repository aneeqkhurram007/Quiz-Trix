import {
  Modal,
  Button,
  InputNumber,
  Divider,
  List,
  Typography,
  Input,
} from "antd";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";
import AskQuestion from "./AskQuestion";
const AddTest = ({ subject }) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("Content of the modal");
  const [numberOfQuestions, setnumberOfQuestions] = useState(1);
  const [questions, setquestions] = useState([]);
  const [testName, setTestName] = useState("");
  const data = Array(numberOfQuestions).fill(0);

  const updateQuestion = (state) => {
    const updatedQuestions = questions.map((item) => {
      if (item.index === state.index) {
        item = state;
      }
      return item;
    });
    setquestions(updatedQuestions);
  };
  const saveQuestion = (state) => {
    const newQuestion = [...questions, state];
    setquestions(newQuestion);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    if (questions.length === 0) {
      setModalText("Please add questions to the test");
      setConfirmLoading(false);
      return;
    }
    setConfirmLoading(true);
    setModalText("Uploading Test");
    try {
      await addDoc(collection(doc(db, "subjects", subject), "test"), {
        questions: questions,
        timestamp: serverTimestamp(),
        active: true,
        testName,
      });
      setConfirmLoading(false);
      setVisible(false);
    } catch (error) {
      console.log(error);
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    // setquestions([]);
    // setnumberOfQuestions(0);
    setVisible(false);
  };
  const clearEverything = () => {
    setquestions([]);
    setnumberOfQuestions(0);
    setTestName("");
  };
  return (
    <>
      <Button type="primary" className="bg-blue-400 mb-2" onClick={showModal}>
        Add a Test
      </Button>
      <Modal
        title="Add a Test"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          <Button
            type="primary"
            className="mb-3 bg-blue-400"
            onClick={clearEverything}
          >
            Clear Everything
          </Button>
          <div className="flex justify-between w-full">
            <label>Test Name: </label>
            <Input
              className="w-1/2"
              controls={true}
              value={testName}
              required
              onChange={(e) => setTestName(e.target.value)}
            />
          </div>
          <div className="flex justify-between w-full">
            <label>Number of Questions</label>
            <InputNumber
              controls={true}
              min={1}
              onChange={(value) => setnumberOfQuestions(value)}
            />
          </div>
          <Divider orientation="left">Questions</Divider>
          <List
            bordered
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <AskQuestion
                  questionState={questions[index]}
                  saveQuestion={saveQuestion}
                  updateQuestion={updateQuestion}
                  index={index}
                />
              </List.Item>
            )}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddTest;
