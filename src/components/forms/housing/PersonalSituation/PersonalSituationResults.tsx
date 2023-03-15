import ExpenseLine from "@/components/content/ExpenseLine";
import ExpensePane from "@/components/content/ExpensePane";
import ExpenseResult from "@/components/content/ExpenseResult";
import { useHousingForm } from "@/contexts/HousingFormContext";

const PersonalSituationResults = () => {
  const { HousingFormState } = useHousingForm();

  return (
    <ExpensePane title="REVENU">
      {HousingFormState.borrowers.map((x, i) => (
        <ExpenseLine label={`Borrower ${i}`} value={x.monthlyIncome} />
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
