import Head from "next/head";
import Header from "@/components/content/Header";
import Page from "../../components/layout/Page";

export default function ExpectedReturns() {
  return (
    <>
      <Head>
        <title>Investment Calculators</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <Header text="Expected Returns Calculator" />
      </Page>
    </>
  );
}
