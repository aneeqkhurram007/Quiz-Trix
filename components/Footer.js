import React from "react";
import { Layout } from "antd";
import { HeartIcon } from "@heroicons/react/solid";

const { Footer: Foot } = Layout;
const Footer = () => {
  return (
    <Foot className="flex justify-center items-center space-x-3">
      <HeartIcon className="h-6 text-red-700" />
      <p>We believe in excellence &copy; QuizTrix</p>
    </Foot>
  );
};

export default Footer;
