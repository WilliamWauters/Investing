import PaneHeader from "@/components/content/PaneHeader";
import FinancialSituationResults from "./FinancialSituationResults";
import RealEstateSituationResults from "./HouseSituationResults";
import PersonalSituationResults from "./PersonalSituationResults";

const RealEstateResultsForm = () => {
  return (
    <>
      <PaneHeader title="Results" />
      <RealEstateSituationResults />
      <PersonalSituationResults />
      <FinancialSituationResults />
    </>
  );
};

export default RealEstateResultsForm;
