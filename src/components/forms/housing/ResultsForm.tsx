import FormPaneHeader from "@/components/content/FormPaneHeader";
import MoneyField from "@/components/inputs/MoneyField";
import InputSection from "@/components/layout/InputSection";
import { useHousingForm } from "@/contexts/HousingFormContext";
import { FormControl } from "@mui/material";
import HousingResultsChart from "./HousingResultsChart";

const ResultsForm = () => {
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
            value={HousingFormState.price}
            handleChange={handleChangePrice}
            handleIncrement={handleChangePriceIncrementation}
          />
        </FormControl>
      </InputSection>
      <HousingResultsChart />
    </>
  );
};

export default ResultsForm;
