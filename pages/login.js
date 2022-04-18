import { Form, Input, Button, Checkbox, Alert } from "antd";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useMe from "../hooks/useMe";
import { setUser } from "../reducers/userReducer";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [alertMessage, setalertMessage] = useState("");
  const { data, loading, error } = useMe();

  useEffect(() => {
    if (data?.email) {
      console.log("Me", data);
      router.replace("/");
    }
  }, [data, loading, error]);
  const onFinish = async (values) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log(user);
      dispatch(
        setUser({
          email: user.user.email,
          accessToken: user.user.accessToken,
          expirationTime: user.user.stsTokenManager.expirationTime,
        })
      );
      setalertMessage("success");
    } catch (error) {
      console.log(error);
      setalertMessage("failed");
    }
  };

  return (
    <div className="flex flex-col space-y-10 justify-center items-center min-h-screen">
      <div className="flex flex-col items-center space-y-4 px-10 animate-bounce">
        <h1 className="text-5xl">Login</h1>
        <h2 className="text-xl">Don&apos;t have an account. Signup</h2>
      </div>
      {alertMessage === "success" && (
        <Alert message="You have been logged in successfully" type="success" />
      )}
      {alertMessage === "failed" && (
        <Alert message="Invalid credentials" type="warning" />
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
