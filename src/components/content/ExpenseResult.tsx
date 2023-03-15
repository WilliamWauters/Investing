import formatMoney from "@/utils/formatMoney";
import { Box, Divider, Typography } from "@mui/material";

type ExpenseResultProps = {
  result: number;
};

const ExpenseResult = ({ result }: ExpenseResultProps) => {
  return (
    <>
      <Divider />
      <Typography
        variant="h6"
        align="right"
        sx={{
          width: "100%",
          color: "#38BDF8",
          fontSize: "1.1rem",
          fontWeight: "bold",
          mb: 2,
        }}
      >
        {`${formatMoney(result)}`}
      </Typography>
    </>
  );
};

export default ExpenseResult;
