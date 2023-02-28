import FormPaneHeader from "@/components/content/FormPaneHeader";
import InputSection from "@/components/layout/InputSection";
import { FormControl } from "@mui/material";
import HousingResultsChart from "./HousingResultsChart";
import MoneyField from "./inputs/moneyField";

const ResultsForm = () => {
  return (
    <>
      <FormPaneHeader title="Results" />
      <InputSection>
        <FormControl fullWidth>
          <MoneyField />
        </FormControl>
      </InputSection>
      <HousingResultsChart />
    </>
  );
};

export default ResultsForm;
