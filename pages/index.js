import Head from "next/head";
import { Layout } from "antd";
import Navbar from "../components/Navbar";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import useMe from "../hooks/useMe";

export default function Home() {
  const router = useRouter();
  const { data, loading, error } = useMe();
  useEffect(() => {
    if (error) {
      router.replace("/login");
    }
  }, [data, loading, error]);
  return (
    <div>
      <Head>
        <title>Quiz Trix</title>
        <meta name="description" content="Quiz trix for kids" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className="flex min-h-screen flex-col justify-between">
        <Navbar />
        <Main />
        <Footer></Footer>
      </Layout>
    </div>
  );
}
