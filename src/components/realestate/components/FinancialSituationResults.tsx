import ExpensePane from "@/components/content/ExpensePane";
import ExpenseLine from "@/components/content/ExpenseLine";
import ExpenseResult from "@/components/content/ExpenseResult";
import { useRealEstateForm } from "@/contexts/RealEstateFormContext";
import {
  getLaonPaymentInfo,
  getMonthlyPaymentCapacity,
  getNotaryFees,
} from "@/utils/calculation";
import FormResults from "@/components/layout/FormResults";

const FinancialSituationResults = () => {
  const { realEstateFormState } = useRealEstateForm();
  const notaryFees = getNotaryFees(
    realEstateFormState.housePrice.value,
    realEstateFormState.taxationRegime.value
  );
  const monthlyPaymentCapacity = getMonthlyPaymentCapacity(
    realEstateFormState.borrowers.reduce(
      (accumulator, currentValue) =>
        accumulator +
        currentValue.monthlyIncome.value -
        currentValue.monthlyExpenses.value,
      0
    )
  );
  const { loan, monthlyPayment, totalPayment } = getLaonPaymentInfo(
    realEstateFormState.housePrice.value,
    realEstateFormState.initialContribution.value,
    notaryFees.total,
    realEstateFormState.creditInterestRate.value,
    Number(realEstateFormState.creditDuration.value)
  );

  return (
    <FormResults>
      <ExpensePane title="LOAN">
        <ExpenseLine label="Notary Fees" value={notaryFees.total} />
        <ExpenseLine
          label="Initial Contribution"
          value={realEstateFormState.initialContribution.value}
        />
        <ExpenseResult
          result={
            realEstateFormState.initialContribution.value - notaryFees.total
          }
        />
        <ExpenseLine
          label={`Rest of Initial Contribution (${(
            ((realEstateFormState.initialContribution.value -
              notaryFees.total) /
              realEstateFormState.housePrice.value) *
            100
          ).toFixed(2)}% of House Price)`}
          value={
            realEstateFormState.initialContribution.value - notaryFees.total
          }
        />
        <ExpenseLine
          label="House Price"
          value={realEstateFormState.housePrice.value}
        />
        <ExpenseResult result={loan} />
        <ExpenseLine label="Loan" value={loan} />
        <ExpenseLine label="Loan monthly payment" value={monthlyPayment} />
        <ExpenseLine
          label="Personal monthly payment capacity"
          value={monthlyPaymentCapacity}
        />
        <ExpenseLine label="Loan total Interest" value={totalPayment} />
      </ExpensePane>
    </FormResults>
  );
};

export default FinancialSituationResults;
