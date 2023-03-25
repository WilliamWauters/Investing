import ExpensePane from "@/components/content/ExpensePane";
import ExpenseLine from "@/components/content/ExpenseLine";
import ExpenseResult from "@/components/content/ExpenseResult";
import { useHousingForm } from "@/contexts/HousingFormContext";
import { getNotaryFees } from "@/utils/calculation";

type FinancialSituationResultsProps = {
  collapsed?: boolean;
};

const FinancialSituationResults = ({
  collapsed,
}: FinancialSituationResultsProps) => {
  const { HousingFormState } = useHousingForm();
  const notaryFees = getNotaryFees(
    HousingFormState.housePrice,
    HousingFormState.taxationRegime
  );
  // let montant_pret = 220000;

  // let ta = 3.62 / 100;
  // let tm = ta / 12;
  // let mens = (montant_pret * tm) / (1 - Math.pow(1 / (1 + tm), 12 * 25));

  // console.log(montant_pret * 0.0362 * 25);

  // ta = taux / 100,
  //   tm = ta / 12,
  //   mens = montant_pret * tm / (1 - Math.pow(1 / (1 + tm), 12 * duree_emprunt)),

  return (
    <ExpensePane collapsed={collapsed} title="LOAN">
      <ExpenseLine label="Notary Fees" value={notaryFees.total} />
      <ExpenseLine
        label="Initial Contribution"
        value={HousingFormState.initialContribution}
      />
      <ExpenseResult
        result={HousingFormState.initialContribution - notaryFees.total}
      />
      <ExpenseLine
        label={`Rest of Initial Contribution (${(
          ((HousingFormState.initialContribution - notaryFees.total) /
            HousingFormState.housePrice) *
          100
        ).toFixed(2)}% of House Price)`}
        value={HousingFormState.initialContribution - notaryFees.total}
      />
      <ExpenseLine label="House Price" value={HousingFormState.housePrice} />
      <ExpenseResult
        result={
          HousingFormState.housePrice +
          notaryFees.total -
          HousingFormState.initialContribution
        }
      />
      <ExpenseLine
        label="Loan"
        value={
          HousingFormState.housePrice +
          notaryFees.total -
          HousingFormState.initialContribution
        }
      />
      <ExpenseLine
        label="Loan Interest"
        value={
          (HousingFormState.housePrice +
            notaryFees.total -
            HousingFormState.initialContribution) *
          (HousingFormState.creditInterestRate / 100)
        }
      />
    </ExpensePane>
  );
};

export default FinancialSituationResults;
