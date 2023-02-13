import { Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";

function formatMoney(value: number) {
  return (
    <Typography component="span" sx={{ fontWeight: "bold", color: "#38BDF8" }}>
      <NumericFormat
        value={value}
        displayType={"text"}
        thousandSeparator={"."}
        decimalSeparator={","}
        prefix={" "}
        suffix={" €"}
      />
    </Typography>
  );
}

export default formatMoney;
