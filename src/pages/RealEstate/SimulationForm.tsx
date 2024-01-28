import Page from "../../components/layout/Page";
import Head from "next/head";
import React from "react";
import { RealEstateFormProvider } from "@/contexts/RealEstateFormContext";
import RealEstateFormStepper from "../../components/realestate/forms/RealEstateFormStepper";
import { Container } from "@mui/material";

export default function RealEstate() {
  return (
    <>
      <Head>
        <title>Investment Calculators</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Page>
          <Container
            maxWidth="sm"
            sx={{
              px: 0,
            }}
          >
            <RealEstateFormProvider>
              <RealEstateFormStepper />
            </RealEstateFormProvider>
          </Container>
        </Page>
      </main>
    </>
  );
}
