import React, { useEffect } from "react";
import useMe from "../../hooks/useMe";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Questions from "../../components/Questions";
const Subject = () => {
  const router = useRouter();
  const { data, loading, error } = useMe();
  useEffect(() => {
    if (error) {
      router.replace("/login");
    }
    console.log(data);
  }, [data, loading, error]);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Head>
        <title>Quiz Trix</title>
        <meta name="description" content="Quiz trix for kids" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="flex-1 min-h-screen">
        <Questions />
      </div>
      <Footer />
    </div>
  );
};

export default Subject;
