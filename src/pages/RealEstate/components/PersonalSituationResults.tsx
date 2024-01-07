import ExpenseLine from "@/components/content/ExpenseLine";
import ExpensePane from "@/components/content/ExpensePane";
import ExpenseResult from "@/components/content/ExpenseResult";
import FormResults from "@/components/layout/FormResults";
import { useRealEstateForm } from "@/contexts/RealEstateFormContext";
import { getMonthlyPaymentCapacity } from "@/utils/calculation";
import { Divider } from "@mui/material";

const PersonalSituationResults = () => {
  const { realEstateFormState } = useRealEstateForm();
  const totalNettoSalary = realEstateFormState.borrowers.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.monthlyIncome.value,
    0
  );
  const monthlyPaymentCapacity = getMonthlyPaymentCapacity(totalNettoSalary);

  return (
    <FormResults>
      <ExpensePane title="INCOME">
        {realEstateFormState.borrowers.map((x, i) => (
          <>
            <ExpenseLine
              key={`BorrowerIcome${i}`}
              label={`Borrower ${i + 1} - Income`}
              value={x.monthlyIncome.value}
            />
            <ExpenseLine
              key={`BorrowerExpenes${i}`}
              label={`Borrower ${i + 1} - Expenses`}
              value={x.monthlyExpenses.value}
            />
            <ExpenseResult
              result={x.monthlyIncome.value - x.monthlyExpenses.value}
            />
          </>
        ))}
        {realEstateFormState.borrowers.map((x, i) => (
          <>
            <ExpenseLine
              key={`BorrowerIcome${i}`}
              label={`Borrower ${i + 1} - Disposable Income`}
              value={x.monthlyIncome.value - x.monthlyExpenses.value}
            />
          </>
        ))}
        <ExpenseResult
          result={realEstateFormState.borrowers.reduce(
            (accumulator, currentValue) =>
              accumulator +
              currentValue.monthlyIncome.value -
              currentValue.monthlyExpenses.value,
            0
          )}
        />
        <ExpenseLine
          label={`Monthly Payment Capacity`}
          value={monthlyPaymentCapacity}
        />
      </ExpensePane>
    </FormResults>
  );
};

export default PersonalSituationResults;
