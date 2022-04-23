import { Layout, Menu } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useMe from "../hooks/useMe";
const { Header } = Layout;
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser, setUserData } from "../reducers/userReducer";
import { useRouter } from "next/router";

export default function Navbar(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const { data, loading, error } = useMe();
  useEffect(() => {}, [data, loading, error, userState]);
  const { userAuth, userData } = userState;
  const logout = async () => {
    try {
      signOut(auth);
      dispatch(setUser(null));
      dispatch(setUserData(null));
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Header className="header flex justify-between items-center">
      <h1 className="text-white text-2xl">Quiz Trix</h1>
      <Menu
        className="w-1/2 flex justify-end"
        inlineCollapsed={false}
        theme="dark"
        mode="horizontal"
      >
        <Menu.Item key="1">
          <Link href="/">Home</Link>
        </Menu.Item>

        {userData?.isSuperUser && (
          <Menu.Item key="3">
            <Link href="/admin">Admin Panel</Link>
          </Menu.Item>
        )}
        {!userAuth ? (
          <>
            <Menu.Item key="4">
              <Link href="/login">Login</Link>
            </Menu.Item>

            <Menu.Item key="5">
              <Link href="/signup">Signup</Link>
            </Menu.Item>
          </>
        ) : (
          <Menu.Item key="6">
            <p onClick={logout}>Logout</p>{" "}
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
}
