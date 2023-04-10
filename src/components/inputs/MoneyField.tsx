import {
  HousingFormActionKind,
  useHousingForm,
} from "@/contexts/HousingFormContext";
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import InputSection from "../layout/InputSection";

type MoneyFieldProps = {
  name: string;
  index?: number;
  label: string;
  value?: number;
  touched?: boolean;
  errorMsg?: string;
  required?: boolean;
  dispatch?: any;
  step?: number;
};

const MoneyField = ({
  name,
  index,
  label,
  value,
  touched,
  errorMsg,
  required,
  dispatch,
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

  var valueOfInput = undefined;
  if (value !== 0) {
    valueOfInput = value;
  }

  if (valueInput !== 0) {
    valueOfInput = valueInput;
  }

  var error = false;
  if (touched && errorMsg !== "") {
    error = true;
  }

  return (
    <InputSection>
      <FormControl fullWidth>
        <NumericFormat
          autoComplete="off"
          customInput={TextField}
          name={name}
          value={valueOfInput}
          label={label}
          variant="outlined"
          thousandSeparator={"."}
          decimalSeparator={","}
          prefix={" "}
          suffix={" €"}
          onBlur={(e) => {
            if (index !== undefined) {
              dispatch({
                type: HousingFormActionKind.TOUCHED_BORROWER,
                payload: { name: name, data: true, index: index },
              });
            } else if (dispatch) {
              dispatch({
                type: HousingFormActionKind.TOCUHED_INPUT,
                payload: { name: name, data: true },
              });
            }
          }}
          error={error}
          onValueChange={({ value: v }) => {
            if (index !== undefined) {
              dispatch({
                type: HousingFormActionKind.UPDATE_INPUT_BORROWER,
                payload: { name: name, data: +v, index: index },
              });
            } else if (dispatch) {
              dispatch({
                type: HousingFormActionKind.UPDATE_INPUT,
                payload: { name: name, data: +v },
              });
            } else {
              handleChangeInput(+v);
            }
          }}
          inputProps={{
            inputMode: "numeric",
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
                      if (index !== undefined) {
                        dispatch({
                          type: HousingFormActionKind.UPDATE_MONEY_DECREASE_BORROWER,
                          payload: { name: name, step: 50, index: index },
                        });
                      } else if (dispatch) {
                        dispatch({
                          type: HousingFormActionKind.UPDATE_MONEY_DECREASE,
                          payload: { name: name, step: 5000 },
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
                      if (index !== undefined) {
                        dispatch({
                          type: HousingFormActionKind.UPDATE_MONEY_INCREASE_BORROWER,
                          payload: { name: name, step: 50, index: index },
                        });
                      } else if (dispatch) {
                        dispatch({
                          type: HousingFormActionKind.UPDATE_MONEY_INCREASE,
                          payload: { name: name, step: 5000 },
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
        {touched && errorMsg && (
          <FormHelperText error={error}>{errorMsg}</FormHelperText>
        )}
      </FormControl>
    </InputSection>
  );
};

export default MoneyField;
