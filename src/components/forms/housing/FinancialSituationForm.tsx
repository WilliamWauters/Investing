import FormPaneHeader from "@/components/content/FormPaneHeader";
import MoneyField from "@/components/inputs/MoneyField";
import InputSection from "@/components/layout/InputSection";
import { useHousingForm } from "@/contexts/HousingFormContext";
import { FormControl } from "@mui/material";

const FinancialSituationForm = () => {
  const {
    HousingFormState,
    handleChangePrice,
    handleChangePriceIncrementation,
  } = useHousingForm();

  return (
    <>
      <FormPaneHeader title="Financial Situation" />
      <InputSection>
        <FormControl fullWidth>
          <MoneyField
            name="initialContribution"
            label="Initial Contribution"
            value={HousingFormState.initialContribution}
            handleChange={handleChangePrice}
            handleIncrement={handleChangePriceIncrementation}
          />
        </FormControl>
      </InputSection>
    </>
  );
};

export default FinancialSituationForm;
