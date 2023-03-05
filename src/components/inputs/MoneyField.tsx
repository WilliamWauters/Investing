import { useHousingForm } from "@/contexts/HousingFormContext";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";

type MoneyFieldProps = {
  name: string;
  index?: number;
  label: string;
  value?: number;
  handleChange?: any;
  handleIncrement?: any;
  step?: number;
};

const MoneyField = ({
  name,
  index,
  label,
  value,
  handleChange,
  handleIncrement,
  step,
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
        return step ? prevState + step : prevState + 5000;
      });
    }
    if (key === "ArrowDown") {
      setValueInput((prevState) => {
        return step ? prevState + step : prevState - 5000;
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
        if (index !== undefined) {
          handleChange(name, +v, index);
        } else if (handleChange) {
          handleChange(name, +v);
        } else {
          handleChangeInput(+v);
        }
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
                  if (index !== undefined) {
                    handleIncrement(name, "ArrowDown", index);
                  } else if (handleChange) {
                    handleIncrement(name, "ArrowDown");
                  } else {
                    handleIncrementInput("ArrowDown");
                  }
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
                  if (index !== undefined) {
                    handleIncrement(name, "ArrowUp", index);
                  } else if (handleChange) {
                    handleIncrement(name, "ArrowUp");
                  } else {
                    handleIncrementInput("ArrowUp");
                  }
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
