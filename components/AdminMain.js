import { Breadcrumb, Layout, Menu } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import AdminUser from "./AdminUser";

const { Sider, Content } = Layout;
const AdminMain = () => {
  const [state, setstate] = useState(<h1>Hello</h1>);
  return (
    <Content className="bg-[#f0f2f5]" style={{ padding: "0 50px" }}>
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
            <Menu.Item className="" key={"1"}>
              <p onClick={() => setstate(<AdminUser />)}>User</p>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ padding: "0 24px", minHeight: 280 }}>{state}</Content>
      </Layout>
    </Content>
  );
};

export default AdminMain;
