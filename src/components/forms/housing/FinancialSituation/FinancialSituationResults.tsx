import ExpensePane from "@/components/content/ExpensePane";
import ExpenseLine from "@/components/content/ExpenseLine";
import ExpenseResult from "@/components/content/ExpenseResult";
import { useHousingForm } from "@/contexts/HousingFormContext";
import { getFees } from "@/utils/calculation";

const FinancialSituationResults = () => {
  const { HousingFormState } = useHousingForm();
  const fees = getFees(
    HousingFormState.housePrice,
    HousingFormState.taxationRegime
  );
  return (
    <ExpensePane title="LOAN">
      <ExpenseLine label="Notary Fees" value={fees.total} />
      <ExpenseLine
        label="Initial Contribution"
        value={HousingFormState.initialContribution}
      />
      <ExpenseResult
        result={HousingFormState.initialContribution - fees.total}
      />
      <ExpenseLine
        label={`Rest of Initial Contribution (${(
          ((HousingFormState.initialContribution - fees.total) /
            HousingFormState.housePrice) *
          100
        ).toFixed(2)}% of House Price)`}
        value={HousingFormState.initialContribution - fees.total}
      />
      <ExpenseLine label="House Price" value={HousingFormState.housePrice} />
      <ExpenseResult
        result={
          HousingFormState.housePrice +
          fees.total -
          HousingFormState.initialContribution
        }
      />
    </ExpensePane>
  );
};

export default FinancialSituationResults;
