import FormPaneHeader from "@/components/content/FormPaneHeader";
import MoneyField from "@/components/inputs/MoneyField";
import InputSection from "@/components/layout/InputSection";
import { useHousingForm } from "@/contexts/HousingFormContext";
import { FormControl } from "@mui/material";
import HousingSituationResults from "./results/HouseSituationResults";
import HousingResultsChart from "./results/HousingResultsChart";
import InvestementPercentages from "./results/InvestmentPercentages";
import PersonalSituationResults from "./results/PersonalSituationResults";

const HousingResultsForm = () => {
  const { HousingFormState, dispatch } = useHousingForm();

  return (
    <>
      <FormPaneHeader title="Results" />
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
      <HousingSituationResults />
      <PersonalSituationResults />
      <InvestementPercentages />
    </>
  );
};

export default HousingResultsForm;
