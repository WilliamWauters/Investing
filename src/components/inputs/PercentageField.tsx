import {
  HousingFormActionKind,
  useHousingForm,
} from "@/contexts/HousingFormContext";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import InputSection from "../layout/InputSection";

type PercentageProps = {
  name: string;
  index?: number;
  label: string;
  value?: number;
  dispatch?: any;
  step?: number;
};

const PercentageField = ({
  name,
  label,
  value,
  dispatch,
  step,
}: PercentageProps) => {
  const [valueInput, setValueInput] = useState(0);
  const handleChangeInput = (newPrice: number | number[]) => {
    if (typeof newPrice === "number") {
      setValueInput(newPrice);
    }
  };

  const handleIncrementInput = (key: string) => {
    if (key === "ArrowUp") {
      setValueInput((prevState) => {
        return step ? prevState + step : prevState + 0.25;
      });
    }
    if (key === "ArrowDown") {
      setValueInput((prevState) => {
        return step ? prevState + step : prevState - 0.25;
      });
    }
  };

  var valueOfInput = undefined;
  if (value !== 0) {
    valueOfInput = value;
  }

  if (valueInput !== 0) {
    valueOfInput = valueInput;
  }

  return (
    <InputSection>
      <FormControl fullWidth>
        <NumericFormat
          customInput={TextField}
          name={name}
          value={valueOfInput}
          label={label}
          variant="outlined"
          thousandSeparator={"."}
          decimalSeparator={","}
          prefix={" "}
          suffix={" %"}
          onValueChange={({ value: v }) => {
            if (dispatch) {
              dispatch({
                type: HousingFormActionKind.UPD_INPUT,
                payload: { name: name, data: +v },
              });
            } else {
              handleChangeInput(+v);
            }
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
                    height: "55px",
                    py: 1,
                    px: 1,
                  }}
                >
                  <IconButton
                    sx={{
                      height: "40px",
                      width: "40px",
                      bgcolor: "#1E293B",
                      borderRadius: 1,
                      "&:hover": { bgcolor: "#374151" },
                      mr: 1,
                    }}
                    onClick={() => {
                      if (dispatch) {
                        dispatch({
                          type: HousingFormActionKind.UPD_PRICE_DECREASE,
                          payload: { name: name, step: 0.25 },
                        });
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
                      height: "40px",
                      width: "40px",
                      bgcolor: "#1E293B",
                      borderRadius: 1,
                      "&:hover": { bgcolor: "#374151" },
                    }}
                    onClick={() => {
                      if (dispatch) {
                        dispatch({
                          type: HousingFormActionKind.UPD_PRICE_INCREASE,
                          payload: { name: name, step: 0.25 },
                        });
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
      </FormControl>
    </InputSection>
  );
};

export default PercentageField;
