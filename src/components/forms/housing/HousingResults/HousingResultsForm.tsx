import FormPaneHeader from "@/components/content/FormPaneHeader";
import MoneyField from "@/components/inputs/MoneyField";
import { useHousingForm } from "@/contexts/HousingFormContext";
import { Box, Button, Collapse } from "@mui/material";
import { useState } from "react";
import FinancialSituationResults from "../FinancialSituation/FinancialSituationResults";
import HousingSituationResults from "../HouseSituation/HouseSituationResults";
import PersonalSituationResults from "../PersonalSituation/PersonalSituationResults";

const HousingResultsForm = () => {
  const [expanded, setExpanded] = useState(true);
  const { housingFormState, dispatch } = useHousingForm();
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
          <MoneyField
            name="housePrice"
            label="House Price"
            value={housingFormState.housePrice}
            dispatch={dispatch}
          />
          <MoneyField
            name="initialContribution"
            label="Initial Contribution"
            value={housingFormState.initialContribution}
            dispatch={dispatch}
          />
        </Box>
      </Collapse>
      <HousingSituationResults collapsed />
      <PersonalSituationResults collapsed />
      <FinancialSituationResults collapsed />
    </>
  );
};

export default HousingResultsForm;
