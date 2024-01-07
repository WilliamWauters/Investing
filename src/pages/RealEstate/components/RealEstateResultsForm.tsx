import FormPaneHeader from "@/components/content/FormPaneHeader";
import FinancialSituationResults from "./FinancialSituationResults";
import RealEstateSituationResults from "./HouseSituationResults";
import PersonalSituationResults from "./PersonalSituationResults";

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
