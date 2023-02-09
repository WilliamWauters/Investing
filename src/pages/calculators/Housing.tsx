import { useEffect, useState } from "react";
import Page from "../../components/layout/Page";
import Header from "@/components/content/Header";
import {
  Box,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import Head from "next/head";
import InputSection from "@/components/layout/InputSection";

function valueLabelFormat(value: number) {
  return (
    <Typography component="span" sx={{ fontWeight: "bold", color: "#38BDF8" }}>
      <NumericFormat
        value={value}
        displayType={"text"}
        thousandSeparator={true}
        prefix={" "}
        suffix={" €"}
      />
    </Typography>
  );
}

export default function Housing() {
  const [location, setLocation] = useState("Bruxelles");
  const [price, setPrice] = useState(250000);
  const [type, setType] = useState("Maison / appartement");
  const [isOwnAndUnique, setIsOwnAndUnique] = useState(false);
  const [isEntiteldToReduction, setIsEntiteldToReduction] = useState(false);

  const handleChangeLocation = (newLocation: string) => {
    setLocation(newLocation);
  };

  const handleChangePrice = (newPrice: number | number[]) => {
    if (typeof newPrice === "number") {
      setPrice(newPrice);
    }
  };

  const handleChangeType = (newType: string) => {
    setType(newType);
  };

  const handleChangeIsOwnAndUnique = (newVal: boolean) => {
    setIsOwnAndUnique(newVal);
  };
  const handleChangeIsEntitledToReduction = (newVal: boolean) => {
    setIsEntiteldToReduction(newVal);
  };

  const getAsObject = () => {
    return {
      location: location,
      price: price,
      type: type,
      isOwnAndUnique: isOwnAndUnique,
      isEntiteldToReduction: isEntiteldToReduction,
    };
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
          <Header text="Housing Calculator" />
          <InputSection>
            <Typography gutterBottom>Situation habitation</Typography>
            <Stack direction="row" spacing={1} justifyContent="center">
              {["Bruxelles", "Flandre", "Wallonia"].map((loca) => {
                return (
                  <Chip
                    color={loca === location ? "primary" : undefined}
                    label={loca}
                    variant="outlined"
                    onClick={() => handleChangeLocation(loca)}
                    sx={{ width: "33%" }}
                  />
                );
              })}
            </Stack>
          </InputSection>
          <InputSection>
            <Typography>Prix :{valueLabelFormat(price)}</Typography>
            <Slider
              sx={{
                mb: -1,
              }}
              size="small"
              value={price}
              min={0}
              step={5000}
              max={1000000}
              defaultValue={250000}
              onChange={(e, val) => handleChangePrice(val)}
            />
          </InputSection>
          <InputSection>
            <Typography gutterBottom>Type de bien</Typography>
            <Stack direction="row" spacing={1} justifyContent="center">
              {["Maison / appartement", "Terrain à bâtir"].map(
                (habitatType) => {
                  return (
                    <Chip
                      color={habitatType === type ? "primary" : undefined}
                      label={habitatType}
                      variant="outlined"
                      onClick={() => handleChangeType(habitatType)}
                      sx={{ width: "50%" }}
                    />
                  );
                }
              )}
            </Stack>
          </InputSection>
          <InputSection>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    value={isOwnAndUnique}
                    onClick={() => handleChangeIsOwnAndUnique(!isOwnAndUnique)}
                  />
                }
                label="Cette habitation est ma propre et unique habitation"
              />
            </FormGroup>
          </InputSection>
          <InputSection>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    value={isEntiteldToReduction}
                    onClick={() =>
                      handleChangeIsEntitledToReduction(!isEntiteldToReduction)
                    }
                  />
                }
                label="J'ai droit à l'abattement de 175.000€"
              />
            </FormGroup>
          </InputSection>
          <Box>
            <pre>{JSON.stringify(getAsObject(), undefined, 4)}</pre>
          </Box>
        </Page>
      </main>
    </>
  );
}
