import ExpenseLine from "@/components/content/ExpenseLine";
import ExpensePane from "@/components/content/ExpensePane";
import ExpenseResult from "@/components/content/ExpenseResult";
import FormResults from "@/components/layout/FormResults";
import { useHousingForm } from "@/contexts/HousingFormContext";
import { getMonthlyPaymentCapacity } from "@/utils/calculation";

const PersonalSituationResults = () => {
  const { housingFormState } = useHousingForm();
  const totalNettoSalary = housingFormState.borrowers.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.monthlyIncome.value,
    0
  );
  const monthlyPaymentCapacity = getMonthlyPaymentCapacity(totalNettoSalary);

  return (
    <FormResults>
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
    </FormResults>
  );
};

export default PersonalSituationResults;
