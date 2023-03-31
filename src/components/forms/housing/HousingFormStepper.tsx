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
import HouseSituationForm from "@/components/forms/housing/HouseSituation/HouseSituationForm";
import PersonalSituationForm from "@/components/forms/housing/PersonalSituation/PersonalSituationForm";
import FinancialSituationForm from "@/components/forms/housing/FinancialSituation/FinancialSituationForm";
import useStepper from "@/hooks/useStepperAction";
import ResultsForm from "@/components/forms/housing/HousingResults/HousingResultsForm";
import HouseSituationResults from "@/components/forms/housing/HouseSituation/HouseSituationResults";
import PersonalSituationResults from "@/components/forms/housing/PersonalSituation/PersonalSituationResults";
import FinancialSituationResults from "@/components/forms/housing/FinancialSituation/FinancialSituationResults";

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

const HousingFormStepper = () => {
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

export default HousingFormStepper;
