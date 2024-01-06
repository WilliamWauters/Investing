import ExpenseLine from "@/components/content/ExpenseLine";
import ExpensePane from "@/components/content/ExpensePane";
import ExpenseResult from "@/components/content/ExpenseResult";
import FormResults from "@/components/layout/FormResults";
import { useRealEstateForm } from "@/contexts/RealEstateFormContext";
import { getNotaryFees } from "@/utils/calculation";

const RealEstateSituationResults = () => {
  const { realEstateFormState } = useRealEstateForm();
  const notaryFees = getNotaryFees(
    realEstateFormState.housePrice.value,
    realEstateFormState.taxationRegime.value
  );

  return (
    <FormResults>
      <ExpensePane title="NOTARY FEES">
        {notaryFees.fees.map((x) => (
          <ExpenseLine
            label={x.name}
            value={x.value}
            key={"HouseSituationResults" + x.name}
          />
        ))}
        <ExpenseResult result={notaryFees.total} />
      </ExpensePane>
    </FormResults>
  );
};

export default RealEstateSituationResults;
