import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { db } from "../firebase";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const Main = () => {
  const [subjects, setsubjects] = useState([]);
  useEffect(() => {
    onSnapshot(
      query(collection(db, "subjects"), orderBy("timestamp", "asc")),
      (snapshot) => {
        setsubjects(
          snapshot.docs?.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      }
    );
  }, []);

  return (
    <Content className="flex-1" style={{ padding: "0 50px" }}>
      <Layout
        className="site-layout-background min-h-screen"
        style={{ padding: "24px 0" }}
      >
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%" }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="Subjects">
              {subjects?.map((subject, index) => (
                <Menu.Item key={index}>
                  <Link
                    href={{
                      pathname: "/subjects/[slug]",
                      query: { slug: subject.id },
                    }}
                  >
                    {subject.id}
                  </Link>
                </Menu.Item>
              ))}
            </SubMenu>
          </Menu>
        </Sider>
        <Content
          className="flex flex-col items-center w-full bg-no-repeat bg-cover"
          style={{
            padding: "0 24px",
            minHeight: 280,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1606326608690-4e0281b1e588?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')",
          }}
        >
          <div>
            <h1 className="text-5xl mt-10 p-2 font-semibold bg-white text-gray-700">
              Welcome to the Quiz Trix
            </h1>
            <p className="mt-10 font-semibold text-gray-700 p-2 bg-white text-2xl">
              Select a subject from side panel and start taking a quiz
            </p>
          </div>
        </Content>
      </Layout>
    </Content>
  );
};

export default Main;
