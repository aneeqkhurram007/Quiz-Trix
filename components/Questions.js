import { Button, Collapse } from "antd";
import React, { useState } from "react";

const { Panel } = Collapse;
const Questions = ({ questions }) => {
  const [disabledState, setdisabledState] = useState(true);
  return (
    <div>
      <div>
        <Button className="bg-blue-400 text-white" type="primary">
          Edit
        </Button>
        <Button className="bg-blue-400 text-white mx-4" type="primary">
          Save
        </Button>
      </div>
      <Collapse></Collapse>
    </div>
  );
};

export default Questions;
