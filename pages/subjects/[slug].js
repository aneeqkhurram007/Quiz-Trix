import React, { useEffect, useState } from "react";
import useMe from "../../hooks/useMe";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { List, Card, Row, Col, Input, Button } from "antd";
import { db } from "../../firebase";
import _ from "lodash";
import useCountDown from "react-countdown-hook";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  where,
  setDoc,
  doc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import Result from "../../components/Result";

const Subject = () => {
  const router = useRouter();
  const { data, loading, error } = useMe();
  const [activeTests, setactiveTests] = useState([]);
  const [section, setsection] = useState(true);
  const [quizSection, setquizSection] = useState(null);

  useEffect(() => {
    if (error) {
      router.replace("/login");
    }
    onSnapshot(
      query(
        collection(db, `subjects/${router.query.slug}/test`),
        where("active", "==", true)
      ),
      (snapshot) => {
        setactiveTests(
          snapshot?.docs
            ?.map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((doc) => {
              return !_.includes(doc?.users, data?.email);
            })
        );
      }
    );
  }, [data, loading, error]);
  const addUser = async (id) => {
    try {
      await updateDoc(doc(db, `subjects/${router.query.slug}/test/${id}`), {
        users: arrayUnion(data.email),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Head>
        <title>Quiz Trix</title>
        <meta name="description" content="Quiz trix for kids" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {section ? (
        <div className=" w-full p-20">
          <h2 className="text-3xl mb-10">
            {activeTests.length
              ? "Active Tests"
              : "No active test found for you"}
          </h2>
          <div className="flex justify-evenly w-full">
            <Row gutter={26} className=" w-full">
              {activeTests?.map((test) => (
                <Col
                  key={test.id}
                  className="cursor-pointer transition-transform duration-300 hover:scale-105 w-full"
                  span={8}
                >
                  <Card
                    onClick={() => {
                      setquizSection(
                        <QuizQuestions
                          quiz={test.questions}
                          name={test.testName}
                        />
                      );
                      setsection(false);
                      addUser(test.id);
                    }}
                    className="w-full"
                    title={test.testName}
                    bordered={true}
                  >
                    <p className="text-lg">
                      Total Questions: {test.questions.length}
                    </p>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      ) : (
        quizSection
      )}
      <Footer />
    </div>
  );
};

export default Subject;
function QuizQuestions({ quiz, name }) {
  const [counter, setcounter] = useState(0);
  const [question, setquestion] = useState(quiz[0]);
  const [selectedAnswer, setselectedAnswer] = useState("");
  const [answers, setanswers] = useState([]);
  const [initialTime, setinitialTime] = useState(30000 * quiz.length);
  const interval = 1000;

  const [timeLeft, { start }] = useCountDown(initialTime, interval);
  useEffect(() => {
    start();
    setTimeout(() => {
      setcounter(quiz.length);
    }, initialTime);
  }, []);

  const nextQuestion = () => {
    setanswers([...answers, selectedAnswer]);
    setselectedAnswer(undefined);
    setcounter(counter + 1);
    setquestion(quiz[counter + 1]);
  };
  const result = () => {
    setanswers([...answers, selectedAnswer]);
    setselectedAnswer(null);
    setcounter(counter + 1);
  };
  return (
    <>
      <h1 className="text-5xl pt-20 pl-20">
        {name}{" "}
        <small>
          {"Total Time Left: "}{" "}
          {counter < quiz.length ? (timeLeft / 1000).toFixed(2) : "00:00"}
        </small>
      </h1>
      {counter === quiz.length ? (
        <Result questions={quiz} answers={answers} />
      ) : (
        <div className="flex-1 flex w-full min-h-fit p-10">
          <div className="w-1/2 border-r flex items-start justify-start pl-10">
            <h1 className="text-4xl">{question?.question}</h1>
          </div>

          <form className="w-1/2 flex flex-col space-y-10 items-start justify-start border-l px-4">
            <List
              dataSource={[...Object.entries(question?.options).sort()]}
              renderItem={(item, index) => (
                <List.Item>
                  <label className="text-lg mx-5 ">{item[0]}</label>
                  <Input
                    onChange={() => {
                      setselectedAnswer(item[0]);
                    }}
                    className="text-blue-700"
                    name="radioButton"
                    type="radio"
                    placeholder="Item"
                  />
                  <label className="text-lg mx-5 rounded bg-gray-200 p-1">
                    {item[1]}
                  </label>
                </List.Item>
              )}
            />
            {counter < quiz.length - 1 ? (
              <Button onClick={nextQuestion} type="primary" className="ml-5">
                Next
              </Button>
            ) : (
              <Button onClick={result} type="primary" className="ml-5">
                Result
              </Button>
            )}
          </form>
        </div>
      )}
    </>
  );
}
