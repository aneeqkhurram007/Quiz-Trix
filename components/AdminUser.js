import { Collapse, Button } from "antd";
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import UserCard from "./UserCard";
import { ReloadOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
const AdminUser = () => {
  const [user, setUser] = useState([]);
  const [refresh, setrefresh] = useState(false);
  useEffect(() => {
    const getUsersData = async () => {
      const users = await getDocs(collection(db, "users"));
      setUser(users.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    getUsersData();
    setrefresh(false);
  }, [refresh]);

  return (
    <div>
      <Button
        className="text-white bg-blue-400"
        tpye="primary"
        onClick={() => setrefresh(!refresh)}
        icon={<ReloadOutlined />}
      >
        Refresh
      </Button>
      <Collapse>
        {user?.map((user) => (
          <Panel
            header={user.firstName + " " + user.lastName}
            key={user.id}
            extra={<p>{user.email}</p>}
          >
            <UserCard user={user} />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default AdminUser;
