import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const Main = () => {
  return (
    <Content className="flex-1" style={{ padding: "0 50px" }}>
      <Layout className="site-layout-background" style={{ padding: "24px 0" }}>
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%" }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="Subjects">
              <Menu.Item key="1">English</Menu.Item>
              <Menu.Item key="2">Math</Menu.Item>
              <Menu.Item key="3">Physics</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content
          className="border border-black"
          style={{ padding: "0 24px", minHeight: 280 }}
        >
          Content
        </Content>
      </Layout>
    </Content>
  );
};

export default Main;
