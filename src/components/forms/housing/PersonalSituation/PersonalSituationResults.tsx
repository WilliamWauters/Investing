import ExpenseLine from "@/components/content/ExpenseLine";
import ExpensePane from "@/components/content/ExpensePane";
import ExpenseResult from "@/components/content/ExpenseResult";
import { useHousingForm } from "@/contexts/HousingFormContext";

type PersonalSituationResultsProps = {
  collapsible?: boolean;
};

const PersonalSituationResults = ({
  collapsible,
}: PersonalSituationResultsProps) => {
  const { HousingFormState } = useHousingForm();

  return (
    <ExpensePane collapsible={collapsible} title="INCOME">
      {HousingFormState.borrowers.map((x, i) => (
        <ExpenseLine
          key={`BorrowerIcome${i}`}
          label={`Income Borrower ${i + 1}`}
          value={x.monthlyIncome}
        />
      ))}
      <ExpenseResult
        result={HousingFormState.borrowers.reduce(
          (accumulator, currentValue) =>
            accumulator +
            (currentValue.monthlyIncome - currentValue.monthlyExpenses),
          0
        )}
      />
    </ExpensePane>
  );
};

export default PersonalSituationResults;
