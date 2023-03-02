import FormPaneHeader from "@/components/content/FormPaneHeader";
import MoneyField from "@/components/inputs/MoneyField";
import InputSection from "@/components/layout/InputSection";
import { useHousingForm } from "@/contexts/HousingFormContext";
import { FormControl } from "@mui/material";
import HousingResultsChart from "./results/HousingResultsChart";
import InvestementPercentages from "./results/InvestmentPercentages";

const HousingResultsForm = () => {
  const {
    HousingFormState,
    handleChangePrice,
    handleChangePriceIncrementation,
  } = useHousingForm();

  return (
    <>
      <FormPaneHeader title="Results" />
      <InputSection>
        <FormControl fullWidth>
          <MoneyField
            name="housePrice"
            label="House Price"
            value={HousingFormState.housePrice}
            handleChange={handleChangePrice}
            handleIncrement={handleChangePriceIncrementation}
          />
        </FormControl>
      </InputSection>
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
      <HousingResultsChart />
      <br />
      <InvestementPercentages />
    </>
  );
};

export default HousingResultsForm;
