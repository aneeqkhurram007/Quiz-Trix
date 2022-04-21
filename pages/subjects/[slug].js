import React, { useEffect, useState } from "react";
import useMe from "../../hooks/useMe";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { List, Card, Row, Col, Input } from "antd";
import { db } from "../../firebase";
import _ from "lodash";
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
  const arrayData = Array(4).fill(0);

  return (
    <div className="flex-1 flex w-full min-h-screen p-10">
      <div className="w-1/2 border-r flex items-center justify-start px-4">
        <h1 className="text-4xl">Question</h1>
      </div>

      <div className="w-1/2 flex items-center justify-start border-l px-4">
        <form>
          <List
            dataSource={arrayData}
            renderItem={(item, index) => (
              <List.Item>
                <label className="text-lg mx-5 ">A</label>
                <Input
                  className="text-blue-700"
                  name="radioButton"
                  type="radio"
                  placeholder="Item"
                />
                <label className="text-lg mx-5 rounded bg-gray-200 p-1">
                  {index}
                </label>
              </List.Item>
            )}
          />
        </form>
      </div>
    </div>
  );
}
