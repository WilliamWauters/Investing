import FormPaneHeader from "@/components/content/FormPaneHeader";
import MoneyField from "@/components/inputs/MoneyField";
import PercentageField from "@/components/inputs/PercentageField";
import SelectField from "@/components/inputs/SelectField";
import { useHousingForm } from "@/contexts/HousingFormContext";
import { creditDurations } from "@/utils/enums/CreditDuration";
import { Fade } from "@mui/material";
import FinancialSituationResults from "./FinancialSituationResults";

const FinancialSituationForm = () => {
  const {
    housingFormState,
    housingFormErrorState,
    housingFormValidationState,
    dispatch,
  } = useHousingForm();
  return (
    <>
      <Fade in={true} timeout={500}>
        <div>
          <FormPaneHeader title="Financial Situation" />
          <MoneyField
            label="Price"
            name="housePrice"
            value={housingFormState.housePrice.value || ""}
            touched={housingFormState.housePrice.touched}
            errorMsg={housingFormErrorState.housePrice}
            dispatch={dispatch}
          />
          <MoneyField
            name="initialContribution"
            label="Initial Contribution"
            value={housingFormState.initialContribution.value || ""}
            touched={housingFormState.initialContribution.touched}
            errorMsg={housingFormErrorState.initialContribution}
            dispatch={dispatch}
          />
          <PercentageField
            name="creditInterestRate"
            label="Credit Interest Rate"
            value={housingFormState.creditInterestRate.value || ""}
            touched={housingFormState.creditInterestRate.touched}
            errorMsg={housingFormErrorState.creditInterestRate}
            dispatch={dispatch}
          />
          <SelectField
            name="creditDuration"
            label="Credit Duration"
            value={housingFormState.creditDuration.value || ""}
            touched={housingFormState.creditDuration.touched}
            errorMsg={housingFormErrorState.creditDuration}
            dispatch={dispatch}
            options={creditDurations}
          />
        </div>
      </Fade>
      {housingFormValidationState.financialSituation && (
        <FinancialSituationResults />
      )}
    </>
  );
};

export default FinancialSituationForm;
