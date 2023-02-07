import Head from "next/head";
import styles from "../styles/Home.module.css";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Home() {
  return (
    <>
      <Head>
        <title>Investement Calculators</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div>
          <span>With default Theme:</span>
        </div>
        <Switch {...label} defaultChecked />
        <Switch {...label} />
        <Switch {...label} disabled defaultChecked />
      </div>
    </>
  );
}
