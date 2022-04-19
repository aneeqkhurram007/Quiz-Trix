import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const Main = () => {
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
              <Menu.Item key="1">
                <Link
                  href={{
                    pathname: "/subjects/[slug]",
                    query: { slug: "english" },
                  }}
                >
                  English
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link
                  href={{
                    pathname: "/subjects/[slug]",
                    query: { slug: "maths" },
                  }}
                >
                  Math
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link
                  href={{
                    pathname: "/subjects/[slug]",
                    query: { slug: "physics" },
                  }}
                >
                  Physics
                </Link>
              </Menu.Item>
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
