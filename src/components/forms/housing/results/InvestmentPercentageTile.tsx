import formatMoney from "@/utils/formatMoney";
import { Box } from "@mui/material";

type InvestementPercentageTileProps = {
  percentage: number;
  housePrice: number;
  initialContribution: number;
  totalFees: number;
};

const InvestementPercentageTile = ({
  percentage,
  housePrice,
  initialContribution,
  totalFees,
}: InvestementPercentageTileProps) => {
  const suggesionContriution = housePrice * percentage;
  const totalCost = suggesionContriution + totalFees;
  const totalLoan = housePrice - suggesionContriution;

  return (
    <Box
      sx={{
        border: 1,
        mx: "auto",
        borderRadius: 2,
        p: 1,
        width: "20%",
        fontSize: "0.75rem",
        fontWeight: "700",
      }}
    >
      <p style={{ textAlign: "center" }}>{percentage * 100} %</p>
      <br />
      <p style={{ textAlign: "right" }}>{formatMoney(suggesionContriution)}</p>
      <p
        style={{
          textAlign: "right",
          color: totalCost > initialContribution ? "red" : "green",
        }}
      >
        {formatMoney(totalCost)}
      </p>
      <p style={{ textAlign: "right" }}>{formatMoney(totalLoan)}</p>
    </Box>
  );
};

export default InvestementPercentageTile;
