import FormPaneHeader from "@/components/content/FormPaneHeader";
import MoneyField from "@/components/inputs/MoneyField";
import PercentageField from "@/components/inputs/PercentageField";
import InputSection from "@/components/layout/InputSection";
import {
  HousingFormActionKind,
  useHousingForm,
} from "@/contexts/HousingFormContext";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import FinancialSituationResults from "./FinancialSituationResults";

const FinancialSituationForm = () => {
  const { HousingFormState, dispatch } = useHousingForm();

  return (
    <>
      <FormPaneHeader title="Financial Situation" />
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
      <InputSection>
        <FormControl fullWidth>
          <PercentageField
            name="creditInterestRate"
            label="Credit Interest Rate"
            value={HousingFormState.creditInterestRate}
            dispatch={dispatch}
          />
        </FormControl>
      </InputSection>
      <InputSection>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Credit Duration</InputLabel>
          <Select
            value={HousingFormState.creditDuration || ""}
            onChange={(e) =>
              dispatch({
                type: HousingFormActionKind.UPD_INPUT,
                payload: { name: "creditDuration", data: e.target.value },
              })
            }
            label="Credit Duration"
          >
            <MenuItem value={20}>20 Years</MenuItem>
            <MenuItem value={25}>25 Years</MenuItem>
          </Select>
        </FormControl>
      </InputSection>
      <FinancialSituationResults />
    </>
  );
};

export default FinancialSituationForm;
