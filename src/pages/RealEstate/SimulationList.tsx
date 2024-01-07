import { useRouter } from "next/router";
import Page from "../../components/layout/Page";
import Head from "next/head";
import React from "react";
import { RealEstateFormProvider } from "@/contexts/RealEstateFormContext";
import { Box, Button, ListItemButton, ListItemText } from "@mui/material";
import FormPaneHeader from "@/components/content/FormPaneHeader";
import SimulationList from "./components/SimulationList";

export default function RealEstate() {
  const router = useRouter();
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
            <FormPaneHeader title="Real Estate Investment Simulations" />
            <SimulationList />
            <SimulationList />
            <SimulationList />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                mx: 2,
                my: 1,
              }}
            >
              <Button
                onClick={() => {
                  router.push("./SimulationForm");
                }}
                sx={{
                  bgcolor: "#1E293B",
                  width: "220px",
                }}
              >
                Create new simulation
              </Button>
            </Box>
          </RealEstateFormProvider>
        </Page>
      </main>
    </>
  );
}
