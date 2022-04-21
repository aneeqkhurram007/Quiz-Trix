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
        <Content className="" style={{ padding: "0 24px", minHeight: 280 }}>
          Content
        </Content>
      </Layout>
    </Content>
  );
};

export default Main;
