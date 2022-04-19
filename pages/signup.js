import { Form, Input, Button, Checkbox, Alert } from "antd";
import { db, auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useMe from "../hooks/useMe";
import { setUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import Link from "next/link";

export default function Signup() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, loading, error } = useMe();
  useEffect(() => {
    if (data?.email) {
      router.replace("/");
    }
  }, [data, loading, error]);

  const [alertMessage, setalertMessage] = useState("");
  const onFinish = async (values) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await addDoc(collection(db, "users"), {
        firstName: values.firstName,
        lastName: values.lastName,
        email: user.user.email,
        isSuperUser: false,
        timestamp: serverTimestamp(),
      });
      dispatch(
        setUser({
          email: user.user.email,
          accessToken: user.user.accessToken,
          expirationTime: user.user.stsTokenManager.expirationTime,
        })
      );

      setalertMessage("success");
      setTimeout(() => {
        router.replace("/");
      }, 1000);
    } catch (error) {
      console.log(error);
      setalertMessage("failed");
    }
  };

  return (
    <div className="flex flex-col space-y-10 justify-center items-center min-h-screen">
      <div className="flex flex-col items-center space-y-4 px-10 ">
        <h1 className="text-5xl animate-bounce">Signin</h1>
        <h2 className="text-xl">
          Already have an account.
          <Link href={"/login"}> Login</Link>
        </h2>
      </div>
      {alertMessage === "success" && (
        <Alert
          message="Your account has been created successfully"
          type="success"
        />
      )}
      {alertMessage === "failed" && (
        <Alert
          message="Account with same email already exists"
          type="warning"
        />
      )}

      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 12,
        }}
        initialValues={{
          remember: true,
        }}
        className=" w-3/4"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
        >
          <Input type={"text"} />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your last name!",
            },
          ]}
        >
          <Input type={"text"} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input type={"email"} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Password must contain 6 or above characters!",
              min: 6,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button className="bg-blue-500" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
