import PaneHeader from "@/components/content/PaneHeader";
import MoneyField from "@/components/inputs/MoneyField";
import PercentageField from "@/components/inputs/PercentageField";
import SelectField from "@/components/inputs/SelectField";
import { useRealEstateForm } from "@/contexts/RealEstateFormContext";
import { creditDurations } from "@/utils/enums/CreditDuration";
import { Fade } from "@mui/material";
import FinancialSituationResults from "../FinancialSituationResults";

const FinancialSituationForm = () => {
  const {
    realEstateFormState,
    realEstateFormErrorState,
    realEstateFormValidationState,
    dispatch,
  } = useRealEstateForm();
  return (
    <>
      <Fade in={true} timeout={500}>
        <div>
          <PaneHeader title="Financial Situation" />
          <MoneyField
            label="Price"
            name="housePrice"
            value={realEstateFormState.housePrice.value || ""}
            touched={realEstateFormState.housePrice.touched}
            errorMsg={realEstateFormErrorState.housePrice}
            dispatch={dispatch}
            onlyPositif
          />
          <MoneyField
            name="initialContribution"
            label="Initial Contribution"
            value={realEstateFormState.initialContribution.value || ""}
            touched={realEstateFormState.initialContribution.touched}
            errorMsg={realEstateFormErrorState.initialContribution}
            dispatch={dispatch}
            onlyPositif
          />
          <PercentageField
            name="creditInterestRate"
            label="Credit Interest Rate"
            value={realEstateFormState.creditInterestRate.value || ""}
            touched={realEstateFormState.creditInterestRate.touched}
            errorMsg={realEstateFormErrorState.creditInterestRate}
            dispatch={dispatch}
            onlyPositif
          />
          <SelectField
            name="creditDuration"
            label="Credit Duration"
            value={realEstateFormState.creditDuration.value || ""}
            touched={realEstateFormState.creditDuration.touched}
            errorMsg={realEstateFormErrorState.creditDuration}
            dispatch={dispatch}
            options={creditDurations}
          />
        </div>
      </Fade>
      {realEstateFormValidationState.financialSituation && (
        <FinancialSituationResults />
      )}
    </>
  );
};

export default FinancialSituationForm;
