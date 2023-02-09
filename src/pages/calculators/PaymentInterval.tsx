import Header from "@/components/content/Header";
import Page from "../../components/layout/Page";
import Head from "next/head";

export default function PaymentInterval() {
  return (
    <>
      <Head>
        <title>Investement Calculators</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <Header text="Payment Interval Calculator" />
      </Page>
    </>
  );
}
