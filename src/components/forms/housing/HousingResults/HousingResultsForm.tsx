import FormPaneHeader from "@/components/content/FormPaneHeader";
import FinancialSituationResults from "../FinancialSituation/FinancialSituationResults";
import HousingSituationResults from "../HouseSituation/HouseSituationResults";
import PersonalSituationResults from "../PersonalSituation/PersonalSituationResults";

const HousingResultsForm = () => {
  return (
    <>
      <FormPaneHeader title="Results" />
      <HousingSituationResults collapsed />
      <PersonalSituationResults collapsed />
      <FinancialSituationResults collapsed />
    </>
  );
};

export default HousingResultsForm;
