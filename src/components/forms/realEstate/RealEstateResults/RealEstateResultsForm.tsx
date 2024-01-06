import FormPaneHeader from "@/components/content/FormPaneHeader";
import FinancialSituationResults from "../FinancialSituation/FinancialSituationResults";
import RealEstateSituationResults from "../HouseSituation/HouseSituationResults";
import PersonalSituationResults from "../PersonalSituation/PersonalSituationResults";

const RealEstateResultsForm = () => {
  return (
    <>
      <FormPaneHeader title="Results" />
      <RealEstateSituationResults />
      <PersonalSituationResults />
      <FinancialSituationResults />
    </>
  );
};

export default RealEstateResultsForm;
