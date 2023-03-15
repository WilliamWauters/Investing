import formatMoney from "@/utils/formatMoney";
import { Box, Typography } from "@mui/material";

type ExpenseLineProps = {
  label: string;
  value: number;
};

const ExpenseLine = ({ label, value }: ExpenseLineProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <>
        <Typography
          variant="h6"
          sx={{
            color: "#38BDF8",
            fontSize: "0.85rem",
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#38BDF8",
            fontSize: "0.85rem",
          }}
        >
          {`${formatMoney(value)}`}
        </Typography>
      </>
    </Box>
  );
};

export default ExpenseLine;
