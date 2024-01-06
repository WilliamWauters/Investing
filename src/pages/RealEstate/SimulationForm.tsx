import Page from "../../components/layout/Page";
import Head from "next/head";
import React from "react";
import { RealEstateFormProvider } from "@/contexts/RealEstateFormContext";
import RealEstateFormStepper from "@/components/forms/realEstate/RealEstateFormStepper";

export default function RealEstate() {
  return (
    <>
      <Head>
        <title>Investement Calculators</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Page>
          <RealEstateFormProvider>
            <RealEstateFormStepper />
          </RealEstateFormProvider>
        </Page>
      </main>
    </>
  );
}
