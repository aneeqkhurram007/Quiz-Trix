import { Button, Collapse } from "antd";
import React from "react";
import AddTest from "./AddTest";
import Questions from "./Questions";
const { Panel } = Collapse;
const AdminSubject = ({ subject }) => {
  return (
    <div>
      <AddTest subject={subject} />
      <Collapse accordion>
        <Panel header="Test 1">
          <Collapse>
            <Panel>
              <Questions />
            </Panel>
            <Panel>Users appeared along with the results</Panel>
          </Collapse>
        </Panel>
      </Collapse>
    </div>
  );
};

export default AdminSubject;
