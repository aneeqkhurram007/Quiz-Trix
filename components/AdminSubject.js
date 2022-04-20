import { Button, Collapse } from "antd";
import React, { useEffect, useState } from "react";
import AddTest from "./AddTest";
import Questions from "./Questions";
import { db } from "../firebase";
import {
  onSnapshot,
  query,
  collection,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

const { Panel } = Collapse;
const AdminSubject = ({ subject }) => {
  const [tests, settests] = useState([]);
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, `subjects/${subject}/test`),
        orderBy("timestamp", "asc")
      ),
      (snaphot) => {
        settests(snaphot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    );
  }, [subject]);
  const deleteTest = async (id) => {
    try {
      await deleteDoc(doc(db, `subjects/${subject}/test/${id}`));
    } catch (error) {
      console.log(error);
    }
  };
  const deleteSubject = async () => {
    try {
      await deleteDoc(doc(db, `subjects/${subject}`));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <AddTest subject={subject} />
      <Button delete onClick={deleteSubject}>
        Delete Subject
      </Button>
      <Collapse accordion>
        {tests?.map((test) => (
          <Panel
            key={test.id}
            header={test.testName}
            extra={<p>id: {test.id}</p>}
          >
            <Button danger className="mb-2" onClick={() => deleteTest(test.id)}>
              Delete Test
            </Button>
            <Collapse>
              <Panel header={"Test Questions"}>
                <Questions
                  subject={subject}
                  testId={test.id}
                  questions={test.questions}
                />
              </Panel>
              <Panel>Users appeared along with the results</Panel>
            </Collapse>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default AdminSubject;
