import ExpensePane from "@/components/content/ExpensePane";
import ExpenseLine from "@/components/content/ExpenseLine";
import ExpenseResult from "@/components/content/ExpenseResult";
import { useHousingForm } from "@/contexts/HousingFormContext";
import {
  getLaonPaymentInfo,
  getMonthlyPaymentCapacity,
  getNotaryFees,
} from "@/utils/calculation";
import FormResults from "@/components/layout/FormResults";

const FinancialSituationResults = () => {
  const { housingFormState } = useHousingForm();
  const notaryFees = getNotaryFees(
    housingFormState.housePrice.value,
    housingFormState.taxationRegime.value
  );
  const monthlyPaymentCapacity = getMonthlyPaymentCapacity(
    housingFormState.borrowers.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.monthlyIncome.value,
      0
    )
  );
  const { loan, monthlyPayment, totalPayment } = getLaonPaymentInfo(
    housingFormState.housePrice.value,
    housingFormState.initialContribution.value,
    notaryFees.total,
    housingFormState.creditInterestRate.value,
    Number(housingFormState.creditDuration.value)
  );

  return (
    <FormResults>
      <ExpensePane title="LOAN">
        <ExpenseLine label="Notary Fees" value={notaryFees.total} />
        <ExpenseLine
          label="Initial Contribution"
          value={housingFormState.initialContribution.value}
        />
        <ExpenseResult
          result={housingFormState.initialContribution.value - notaryFees.total}
        />
        <ExpenseLine
          label={`Rest of Initial Contribution (${(
            ((housingFormState.initialContribution.value - notaryFees.total) /
              housingFormState.housePrice.value) *
            100
          ).toFixed(2)}% of House Price)`}
          value={housingFormState.initialContribution.value - notaryFees.total}
        />
        <ExpenseLine
          label="House Price"
          value={housingFormState.housePrice.value}
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
