import {
  Box,
  Button,
  Step,
  Stepper,
  StepButton,
  StepContent,
  Fade,
} from "@mui/material";
import React from "react";
import FormSection from "@/components/layout/FormSection";
import FormPane from "@/components/layout/FormPane";
import HouseSituationForm from "@/pages/RealEstate/components/forms/HouseSituationForm";
import PersonalSituationForm from "@/pages/RealEstate/components/forms/PersonalSituationForm";
import FinancialSituationForm from "@/pages/RealEstate/components/forms/FinancialSituationForm";
import useStepper from "@/hooks/useStepperAction";
import ResultsForm from "@/pages/RealEstate/components/RealEstateResultsForm";
import HouseSituationResults from "@/pages/RealEstate/components/HouseSituationResults";
import PersonalSituationResults from "@/pages/RealEstate/components/PersonalSituationResults";
import FinancialSituationResults from "@/pages/RealEstate/components/FinancialSituationResults";

const forms = [
  {
    id: "houseSituation",
    label: "House",
    component: <HouseSituationForm />,
    results: <HouseSituationResults />,
  },
  {
    id: "personalSituation",
    label: "Person",
    component: <PersonalSituationForm />,
    results: <PersonalSituationResults />,
  },
  {
    id: "financialSituation",
    label: "Finance",
    component: <FinancialSituationForm />,
    results: <FinancialSituationResults />,
  },
  {
    id: "houseResults",
    label: "Results",
    component: <ResultsForm />,
  },
];

const RealEstateFormStepper = () => {
  const [activeForm, handleNext, handleBack, handleStep] = useStepper(forms);

  return (
    <FormSection>
      <Box
        sx={{
          mx: "auto",
          my: 2,
          px: 2,
        }}
      >
        <Stepper nonLinear activeStep={activeForm}>
          {forms.map((form, index) => (
            <Step key={form.label}>
              <StepButton
                color="inherit"
                onClick={handleStep(index)}
              ></StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
      <FormPane>{forms[activeForm].component}</FormPane>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          mx: 2,
          my: 1,
        }}
      >
        <Button
          disabled={activeForm === 0}
          onClick={handleBack}
          sx={{
            bgcolor: "#1E293B",
          }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        {activeForm !== forms.length - 1 && (
          <Button
            onClick={handleNext}
            sx={{
              bgcolor: "#1E293B",
            }}
          >
            Next
          </Button>
        )}
      </Box>
    </FormSection>
  );
};

export default RealEstateFormStepper;
