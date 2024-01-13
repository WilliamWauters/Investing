import { useRouter } from "next/router";
import Page from "../../components/layout/Page";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import {
  RealEstateFormProvider,
  RealEstateFormState,
} from "@/contexts/RealEstateFormContext";
import { Box, Button, ListItemButton, ListItemText } from "@mui/material";
import PaneHeader from "@/components/content/PaneHeader";
import SimulationList from "./components/SimulationList";

export default function RealEstate() {
  const router = useRouter();
  const [simulations, setSimulations] = useState([]);

  useEffect(() => {
    setSimulations(getSimulations());
  }, []);

  const getSimulations = () => {
    const realEstateSimulationsJSON = localStorage.getItem(
      "realEstateSimulationsJSON"
    );
    var simulations = realEstateSimulationsJSON
      ? JSON.parse(realEstateSimulationsJSON)
      : [];
    return simulations;
  };

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
            <PaneHeader
              title="Real Estate Investment Simulations"
              style={{ mx: 0 }}
            />
            <SimulationList data={simulations} />
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
