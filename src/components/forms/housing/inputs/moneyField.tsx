import { useHousingForm } from "@/contexts/HousingFormContext";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const MoneyField = () => {
  const {
    HousingFormState,
    handleChangePrice,
    handleChangePriceIncrementation,
  } = useHousingForm();

  return (
    <NumericFormat
      customInput={TextField}
      value={HousingFormState.price}
      label="Amount"
      variant="outlined"
      size="small"
      thousandSeparator={"."}
      decimalSeparator={","}
      prefix={" "}
      suffix={" €"}
      onValueChange={({ value: v }) => {
        handleChangePrice(+v);
      }}
      onKeyDown={(e) => {
        handleChangePriceIncrementation(e.key);
      }}
      InputProps={{
        style: {
          paddingRight: 0,
        },
        endAdornment: (
          <InputAdornment position="end">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                height: "40px",
                py: 1,
                px: 1,
              }}
            >
              <IconButton
                sx={{
                  height: "25px",
                  width: "30px",
                  bgcolor: "#1E293B",
                  borderRadius: 1,
                  "&:hover": { bgcolor: "#374151" },
                  mr: 1,
                }}
                onClick={() => handleChangePriceIncrementation("ArrowDown")}
              >
                <RemoveIcon
                  sx={{
                    height: "20px",
                    width: "20px",
                  }}
                />
              </IconButton>
              <IconButton
                sx={{
                  // border: 1,
                  height: "25px",
                  width: "30px",
                  bgcolor: "#1E293B",
                  borderRadius: 1,
                  "&:hover": { bgcolor: "#374151" },
                }}
                onClick={() => handleChangePriceIncrementation("ArrowUp")}
              >
                <AddIcon
                  sx={{
                    height: "20px",
                    width: "20px",
                  }}
                />
              </IconButton>
            </Box>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default MoneyField;
