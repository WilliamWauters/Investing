import FormPaneHeader from "@/components/content/FormPaneHeader";
import MoneyField from "@/components/inputs/MoneyField";
import PercentageField from "@/components/inputs/PercentageField";
import SelectField from "@/components/inputs/SelectField";
import { useHousingForm } from "@/contexts/HousingFormContext";
import { creditDurations } from "@/utils/enums/CreditDuration";
import { Fade, Grow } from "@mui/material";
import FinancialSituationResults from "./FinancialSituationResults";

const FinancialSituationForm = () => {
  const { housingFormState, dispatch } = useHousingForm();
  const isFormValid = () => {
    var isValid = true;
    if (housingFormState.housePrice === undefined) {
      isValid = false;
    }
    if (housingFormState.initialContribution === undefined) {
      isValid = false;
    }
    if (housingFormState.creditInterestRate === undefined) {
      isValid = false;
    }
    if (housingFormState.creditDuration === "") {
      isValid = false;
    }
    return isValid;
  };
  return (
    <>
      <Fade in={true} timeout={500}>
        <div>
          <FormPaneHeader title="Financial Situation" />
          <MoneyField
            label="Price"
            name="housePrice"
            value={housingFormState.housePrice}
            required
            touched={housingFormState.touched.housePrice}
            dispatch={dispatch}
          />
          <MoneyField
            name="initialContribution"
            label="Initial Contribution"
            value={housingFormState.initialContribution}
            required
            touched={housingFormState.touched.initialContribution}
            dispatch={dispatch}
          />
          <PercentageField
            name="creditInterestRate"
            label="Credit Interest Rate"
            value={housingFormState.creditInterestRate}
            required
            touched={housingFormState.touched.creditInterestRate}
            dispatch={dispatch}
          />
          <SelectField
            name="creditDuration"
            label="Credit Duration"
            value={housingFormState.creditDuration || ""}
            dispatch={dispatch}
            required
            touched={housingFormState.touched.creditDuration}
            options={creditDurations}
          />
        </div>
      </Fade>
      {isFormValid() && <FinancialSituationResults collapsed={false} />}
    </>
  );
};

export default FinancialSituationForm;
