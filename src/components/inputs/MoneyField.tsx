import { useHousingForm } from "@/contexts/HousingFormContext";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";

type MoneyFieldProps = {
  name: string;
  label: string;
  value?: number;
  handleChange?: any;
  handleIncrement?: any;
};

const MoneyField = ({
  name,
  label,
  value,
  handleChange,
  handleIncrement,
}: MoneyFieldProps) => {
  const [valueInput, setValueInput] = useState(0);
  const handleChangeInput = (newPrice: number | number[]) => {
    if (typeof newPrice === "number") {
      setValueInput(newPrice);
    }
  };

  const handleIncrementInput = (key: string) => {
    if (key === "ArrowUp") {
      setValueInput((prevState) => {
        return prevState + 5000;
      });
    }
    if (key === "ArrowDown") {
      setValueInput((prevState) => {
        return prevState - 5000;
      });
    }
  };

  return (
    <NumericFormat
      customInput={TextField}
      name={name}
      value={value || valueInput}
      label={label}
      variant="outlined"
      size="small"
      thousandSeparator={"."}
      decimalSeparator={","}
      prefix={" "}
      suffix={" €"}
      onValueChange={({ value: v }) => {
        handleChange ? handleChange(name, +v) : handleChangeInput(+v);
      }}
      onKeyDown={(e) => {
        handleIncrement
          ? handleIncrement(name, e.key)
          : handleIncrementInput(e.key);
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
                onClick={() => {
                  handleIncrement
                    ? handleIncrement(name, "ArrowDown")
                    : handleIncrementInput("ArrowDown");
                }}
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
                onClick={() => {
                  handleIncrement
                    ? handleIncrement(name, "ArrowUp")
                    : handleIncrementInput("ArrowUp");
                }}
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
