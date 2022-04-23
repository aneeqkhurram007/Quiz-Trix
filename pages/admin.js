import Head from "next/head";
import React, { useEffect } from "react";
import AdminMain from "../components/AdminMain";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import useMe from "../hooks/useMe";
import { useRouter } from "next/router";

const Admin = () => {
  const router = useRouter();
  const { data, loading, error } = useMe();
  useEffect(() => {
    if (error) {
      router.replace("/login");
    }
  }, [data, loading, error]);
  return (
    <div className="flex justify-between flex-col">
      <Head>
        <title>Admin Panel</title>
        <meta name="description" content="Quiz trix for kids" />
      </Head>
      <Navbar />
      <AdminMain />
      <Footer />
    </div>
  );
};

export default Admin;
