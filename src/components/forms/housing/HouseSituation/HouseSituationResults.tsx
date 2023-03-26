import ExpenseLine from "@/components/content/ExpenseLine";
import ExpensePane from "@/components/content/ExpensePane";
import ExpenseResult from "@/components/content/ExpenseResult";
import { useHousingForm } from "@/contexts/HousingFormContext";
import { getNotaryFees } from "@/utils/calculation";

type HousingSituationResultsProps = {
  collapsed?: boolean;
};

const HousingSituationResults = ({
  collapsed,
}: HousingSituationResultsProps) => {
  const { housingFormState } = useHousingForm();
  const notaryFees = getNotaryFees(
    housingFormState.housePrice,
    housingFormState.taxationRegime
  );

  return (
    <ExpensePane collapsed={collapsed} title="NOTARY FEES">
      {notaryFees.fees.map((x) => (
        <ExpenseLine
          label={x.name}
          value={x.value}
          key={"HouseSituationResults" + x.name}
        />
      ))}
      <ExpenseResult result={notaryFees.total} />
    </ExpensePane>
  );
};

export default HousingSituationResults;
