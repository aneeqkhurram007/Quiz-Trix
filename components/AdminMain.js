import { Button, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import AdminUser from "./AdminUser";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import AdminSubject from "./AdminSubject";

const { Sider, Content } = Layout;
const AdminMain = () => {
  const [state, setstate] = useState(<h1>Hello</h1>);
  const [refresh, setrefresh] = useState(false);
  useEffect(() => {
    setrefresh(false);
  }, [refresh]);

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
              >
                Add a subject
              </Button>
              <Menu.Item
                key="1"
                onClick={() => setstate(<AdminSubject subject="English" />)}
              >
                English
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: "0 24px", minHeight: 280 }}>{state}</Content>
      </Layout>
    </Content>
  );
};

export default AdminMain;
