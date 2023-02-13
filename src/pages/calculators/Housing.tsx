import { useEffect, useState } from "react";
import Page from "../../components/layout/Page";
import Header from "@/components/content/Header";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
  Collapse,
  StepButton,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import Head from "next/head";
import InputSection from "@/components/layout/InputSection";
import ChoiceChipGroup from "@/components/inputs/ChoiceChipGroup";
import MoneySlider from "@/components/inputs/MoneySlider";
import formatMoney from "@/utils/formatMoney";
import { getRegistrationFee, getNotaryFee, getTVA } from "@/utils/calculation";
import MobileStepper from "@mui/material/MobileStepper";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import React from "react";
import FormSection from "@/components/layout/FormSection";

const steps = ["House", "Finance", "Analysis"];

export default function Housing() {
  // State Variable
  const [location, setLocation] = useState("Bruxelles");
  const [price, setPrice] = useState(250000);
  const [type, setType] = useState("Maison / appartement");
  const [isOwnAndUnique, setIsOwnAndUnique] = useState(true);
  const [isEntiteldToReduction, setIsEntiteldToReduction] = useState(true);

  // Derived State values
  const RegistrationFee = getRegistrationFee(price, isEntiteldToReduction);
  const NotaryFee = getNotaryFee(price);
  const TVA = getTVA(price);

  // HANDLE CHANGES
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

  useEffect(() => {
    if (price < 500000 && isOwnAndUnique) {
      setIsEntiteldToReduction(true);
    } else {
      setIsEntiteldToReduction(false);
    }
  }, [price, isOwnAndUnique]);

  // STEPPER FUNCTIONS
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
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
          <FormSection>
            <Box sx={{ my: 2 }}>
              <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label} completed={completed[index]}>
                    <StepButton color="inherit" onClick={handleStep(index)}>
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
            </Box>
            {allStepsCompleted() ? (
              <>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you're finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    mx: "auto",
                  }}
                  maxWidth="480px"
                >
                  <InputSection>
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">Age</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </InputSection>
                  <InputSection>
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">Age</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </InputSection>
                  <InputSection>
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">Age</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </InputSection>
                  <InputSection>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isOwnAndUnique}
                            onClick={() =>
                              handleChangeIsOwnAndUnique(!isOwnAndUnique)
                            }
                          />
                        }
                        label="Cette habitation est ma propre et unique habitation"
                      />
                    </FormGroup>
                  </InputSection>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleNext}>Next</Button>
                </Box>
              </>
            )}
          </FormSection>
        </Page>
      </main>
    </>
  );
}
