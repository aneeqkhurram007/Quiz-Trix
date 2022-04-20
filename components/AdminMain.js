import { Button, Input, Layout, Menu, Modal } from "antd";
import React, { useEffect, useState } from "react";
import AdminUser from "./AdminUser";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import AdminSubject from "./AdminSubject";
import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const { Sider, Content } = Layout;
const AdminMain = () => {
  const [state, setstate] = useState();
  const [refresh, setrefresh] = useState(false);
  const [visible, setvisible] = useState(false);
  const [confirmLoading, setconfirmLoading] = useState(false);
  const [subjectName, setsubjectName] = useState("");
  const [subjects, setsubjects] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "subjects"), (snapshot) => {
      setsubjects(
        snapshot?.docs?.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });
    setrefresh(false);
  }, [refresh]);
  const showModal = () => {
    setvisible(true);
  };
  const addSubject = async () => {
    setconfirmLoading(true);
    try {
      setDoc(doc(db, `subjects/${subjectName}`), {
        timestamp: serverTimestamp(),
      });
      setconfirmLoading(false);
      setvisible(false);
      setsubjectName("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Content className="bg-[#f0f2f5]" style={{ padding: "0 50px" }}>
      <Modal
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={addSubject}
        title={"Add a Subject"}
        onCancel={() => setvisible(false)}
      >
        <div className="w-full flex justify-between">
          <label className="w-1/2">Subject:</label>
          <Input
            value={subjectName}
            type="text"
            placeholder="Subject..."
            onChange={(e) => setsubjectName(e.target.value)}
          />
        </div>
      </Modal>
      <Layout
        className="site-layout-background min-h-screen"
        style={{ padding: "24px 0" }}
      >
        <Sider theme="dark" className="site-layout-background" width={200}>
          <Menu
            theme="dark"
            mode={"inline"}
            inlineCollapsed="true"
            className="h-full"
          >
            <Menu.Item className="" key={"main1"}>
              <p onClick={() => setstate(<AdminUser />)}>User</p>
            </Menu.Item>
            <Menu.SubMenu
              key={"sub1"}
              title="Subjects"
              onTitleClick={(e) => {
                setrefresh(!refresh);
              }}
              className="space-y-2"
              icon={<ReloadOutlined />}
            >
              <Button
                type="primary"
                className="border-none w-full"
                icon={<PlusOutlined />}
                onClick={showModal}
              >
                Add a subject
              </Button>
              {subjects?.map((subject, index) => (
                <Menu.Item
                  key={index}
                  onClick={() =>
                    setstate(<AdminSubject subject={subject.id} />)
                  }
                >
                  {subject.id}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: "0 24px", minHeight: 280 }}>{state}</Content>
      </Layout>
    </Content>
  );
};

export default AdminMain;
