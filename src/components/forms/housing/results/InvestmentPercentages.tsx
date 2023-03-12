import { useHousingForm } from "@/contexts/HousingFormContext";
import { getFees } from "@/utils/calculation";
import { Box } from "@mui/material";
import InvestementPercentageTile from "./InvestmentPercentageTile";
const InvestementPercentages = () => {
  const { HousingFormState } = useHousingForm();
  const fees = getFees(
    HousingFormState.housePrice,
    HousingFormState.taxationRegime
  );
  const investmentOptions = [0, 0.05, 0.1, 0.2];
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        mx: "auto",
        my: 1,
      }}
    >
      <>
        {investmentOptions.map((x) => {
          return (
            <InvestementPercentageTile
              key={`InvestementPercentageTile${x * 100}%`}
              percentage={x}
              housePrice={HousingFormState.housePrice}
              initialContribution={HousingFormState.initialContribution}
              totalFees={fees.total}
            />
          );
        })}
      </>
    </Box>
  );
};

export default InvestementPercentages;
