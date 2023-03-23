import ExpenseLine from "@/components/content/ExpenseLine";
import ExpensePane from "@/components/content/ExpensePane";
import ExpenseResult from "@/components/content/ExpenseResult";
import { useHousingForm } from "@/contexts/HousingFormContext";
import { getFees } from "@/utils/calculation";

type HousingSituationResultsProps = {
  collapsed?: boolean;
};

const HousingSituationResults = ({
  collapsed,
}: HousingSituationResultsProps) => {
  const { HousingFormState } = useHousingForm();
  const fees = getFees(
    HousingFormState.housePrice,
    HousingFormState.taxationRegime
  );

  return (
    <ExpensePane collapsed={collapsed} title="NOTARY FEES">
      {fees.fees.map((x) => (
        <ExpenseLine
          label={x.name}
          value={x.value}
          key={"HouseSituationResults" + x.name}
        />
      ))}
      <ExpenseResult result={fees.total} />
    </ExpensePane>
  );
};

export default HousingSituationResults;
