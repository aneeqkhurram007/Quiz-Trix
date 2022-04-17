import Head from "next/head";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Quiz Trix</title>
        <meta name="description" content="Quiz trix for kids" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
