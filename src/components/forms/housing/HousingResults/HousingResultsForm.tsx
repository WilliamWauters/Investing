import FormPaneHeader from "@/components/content/FormPaneHeader";
import MoneyField from "@/components/inputs/MoneyField";
import InputSection from "@/components/layout/InputSection";
import { useHousingForm } from "@/contexts/HousingFormContext";
import { Box, Button, Collapse, FormControl } from "@mui/material";
import { useState } from "react";
import FinancialSituationResults from "../FinancialSituation/FinancialSituationResults";
import HousingSituationResults from "../HouseSituation/HouseSituationResults";
import PersonalSituationResults from "../PersonalSituation/PersonalSituationResults";

const HousingResultsForm = () => {
  const [expanded, setExpanded] = useState(true);
  const { HousingFormState, dispatch } = useHousingForm();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <FormPaneHeader title="Results" />
      <Button
        sx={{
          mx: 2,
          bgcolor: "#1E293B",
        }}
        onClick={(e) => handleExpandClick()}
      >
        {`${expanded ? "Hide" : "Show"} Main Controls`}
      </Button>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box>
          <InputSection>
            <FormControl fullWidth>
              <MoneyField
                name="housePrice"
                label="House Price"
                value={HousingFormState.housePrice}
                dispatch={dispatch}
              />
            </FormControl>
          </InputSection>
          <InputSection>
            <FormControl fullWidth>
              <MoneyField
                name="initialContribution"
                label="Initial Contribution"
                value={HousingFormState.initialContribution}
                dispatch={dispatch}
              />
            </FormControl>
          </InputSection>
        </Box>
      </Collapse>
      <HousingSituationResults collapsed />
      <PersonalSituationResults collapsed />
      <FinancialSituationResults collapsed />
    </>
  );
};

export default HousingResultsForm;
