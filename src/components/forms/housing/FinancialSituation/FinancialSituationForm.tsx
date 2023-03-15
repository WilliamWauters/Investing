import FormPaneHeader from "@/components/content/FormPaneHeader";
import MoneyField from "@/components/inputs/MoneyField";
import InputSection from "@/components/layout/InputSection";
import { useHousingForm } from "@/contexts/HousingFormContext";
import { FormControl } from "@mui/material";
import FinancialSituationResults from "./FinancialSituationResults";

const FinancialSituationForm = () => {
  const { HousingFormState, dispatch } = useHousingForm();

  return (
    <>
      <FormPaneHeader title="Financial Situation" />
      <InputSection>
        <FormControl fullWidth>
          <MoneyField
            label="Price"
            name="housePrice"
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
      <FinancialSituationResults />
    </>
  );
};

export default FinancialSituationForm;
