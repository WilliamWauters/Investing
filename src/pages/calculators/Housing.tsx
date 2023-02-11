import { useState } from "react";
import Page from "../../components/layout/Page";
import Header from "@/components/content/Header";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
  Typography,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import Head from "next/head";
import InputSection from "@/components/layout/InputSection";
import ChoiceChipGroup from "@/components/inputs/ChoiceChipGroup";
import MoneySlider from "@/components/inputs/MoneySlider";

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
            <ChoiceChipGroup
              label="Situation habitation"
              options={["Bruxelles", "Flandre", "Wallonia"]}
              value={location}
              handleChange={handleChangeLocation}
            />
          </InputSection>
          <InputSection>
            <MoneySlider
              label="Prix"
              min={0}
              step={5000}
              max={1000000}
              defaultValue={250000}
              value={price}
              handleChange={handleChangePrice}
            />
          </InputSection>
          <InputSection>
            <ChoiceChipGroup
              label="Type de bien"
              options={["Maison / appartement", "Terrain à bâtir"]}
              value={type}
              handleChange={handleChangeType}
            />
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
