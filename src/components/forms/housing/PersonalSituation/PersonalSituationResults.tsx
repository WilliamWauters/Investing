import ExpenseLine from "@/components/content/ExpenseLine";
import ExpensePane from "@/components/content/ExpensePane";
import ExpenseResult from "@/components/content/ExpenseResult";
import { useHousingForm } from "@/contexts/HousingFormContext";
import { getMonthlyPaymentCapacity } from "@/utils/calculation";

type PersonalSituationResultsProps = {
  collapsed?: boolean;
};

const PersonalSituationResults = ({
  collapsed,
}: PersonalSituationResultsProps) => {
  const { housingFormState } = useHousingForm();
  const totalNettoSalary = housingFormState.borrowers.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.monthlyIncome.value,
    0
  );
  const monthlyPaymentCapacity = getMonthlyPaymentCapacity(totalNettoSalary);

  return (
    <ExpensePane title="INCOME">
      {housingFormState.borrowers.map((x, i) => (
        <ExpenseLine
          key={`BorrowerIcome${i}`}
          label={`Income Borrower ${i + 1}`}
          value={x.monthlyIncome.value}
        />
      ))}
      <ExpenseResult
        result={housingFormState.borrowers.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.monthlyIncome.value,
          0
        )}
      />
      <ExpenseLine
        label={`Monthly Payment Capacity`}
        value={monthlyPaymentCapacity}
      />
    </ExpensePane>
  );
};

export default PersonalSituationResults;
