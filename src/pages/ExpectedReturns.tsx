import Head from "next/head";
import "../styles/Home.module.css";
import styles from "@/styles/Home.module.css";

export default function ExpectedReturns() {
  return (
    <>
      <Head>
        <title>Investement Calculators</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          <h1>ExpectedReturns</h1>
        </div>
      </main>
    </>
  );
}
