import ExpenseLine from "@/components/content/ExpenseLine";
import ExpensePane from "@/components/content/ExpensePane";
import ExpenseResult from "@/components/content/ExpenseResult";
import { useHousingForm } from "@/contexts/HousingFormContext";
import { getNotaryFees } from "@/utils/calculation";
import { useEffect } from "react";

type HousingSituationResultsProps = {
  collapsed?: boolean;
};

const HousingSituationResults = ({
  collapsed,
}: HousingSituationResultsProps) => {
  const { housingFormState } = useHousingForm();
  const notaryFees = getNotaryFees(
    housingFormState.housePrice.value,
    housingFormState.taxationRegime.value
  );

  useEffect(() => {
    const element = document.getElementById("scrollToHere");
    if (element) {
      if (element.getBoundingClientRect().bottom > window.innerHeight) {
        element.scrollIntoView(false);
      }

      if (element.getBoundingClientRect().top < 0) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div id="scrollToHere">
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
    </div>
  );
};

export default HousingSituationResults;
