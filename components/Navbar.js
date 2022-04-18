import { Layout, Menu } from "antd";
import React from "react";
const { Header } = Layout;
export default function Navbar(props) {
  return (
    <Header className="header flex justify-between items-center">
      <h1 className="text-white text-2xl">Quiz Trix</h1>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">About</Menu.Item>
      </Menu>
    </Header>
  );
}
