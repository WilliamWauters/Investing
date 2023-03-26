import FormPaneHeader from "@/components/content/FormPaneHeader";
import MoneyField from "@/components/inputs/MoneyField";
import PercentageField from "@/components/inputs/PercentageField";
import SelectField from "@/components/inputs/SelectField";
import { useHousingForm } from "@/contexts/HousingFormContext";
import { creditDurations } from "@/utils/enums/CreditDuration";
import FinancialSituationResults from "./FinancialSituationResults";

const FinancialSituationForm = () => {
  const { housingFormState, dispatch } = useHousingForm();

  return (
    <>
      <FormPaneHeader title="Financial Situation" />
      <MoneyField
        label="Price"
        name="housePrice"
        value={housingFormState.housePrice}
        dispatch={dispatch}
      />
      <MoneyField
        name="initialContribution"
        label="Initial Contribution"
        value={housingFormState.initialContribution}
        dispatch={dispatch}
      />
      <PercentageField
        name="creditInterestRate"
        label="Credit Interest Rate"
        value={housingFormState.creditInterestRate}
        dispatch={dispatch}
      />
      <SelectField
        name="creditDuration"
        label="Credit Duration"
        value={housingFormState.creditDuration || ""}
        dispatch={dispatch}
        options={creditDurations}
      />
      <FinancialSituationResults collapsed={false} />
    </>
  );
};

export default FinancialSituationForm;
