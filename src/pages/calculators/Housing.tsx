import Page from "../../components/layout/Page";
import Head from "next/head";
import React from "react";
import { HousingFormProvider } from "@/contexts/HousingFormContext";
import HousingFormStepper from "@/components/forms/housing/HousingFormStepper";

export default function Housing() {
  return (
    <>
      <Head>
        <title>Investement Calculators</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Page>
          <HousingFormProvider>
            <HousingFormStepper />
          </HousingFormProvider>
        </Page>
      </main>
    </>
  );
}
