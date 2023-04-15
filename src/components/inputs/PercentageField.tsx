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

type PercentageProps = {
  name: string;
  index?: number;
  label: string;
  value?: number;
  touched?: boolean;
  errorMsg?: string;
  required?: boolean;
  dispatch?: any;
  step?: number;
  onlyPositif?: boolean;
};

const PercentageField = ({
  name,
  label,
  value,
  touched,
  errorMsg,
  dispatch,
  step,
  onlyPositif,
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

  var disabledDecreasButton = false;
  if (onlyPositif === true) {
    if (valueOfInput === undefined) {
      disabledDecreasButton = true;
    }
    if (valueOfInput === 0) {
      disabledDecreasButton = true;
    }
    if (!valueOfInput) {
      disabledDecreasButton = true;
    }
  }

  var error = false;
  if (touched && errorMsg !== "") {
    error = true;
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
          error={error}
          onBlur={(e) => {
            if (dispatch) {
              dispatch({
                type: HousingFormActionKind.TOCUHED_INPUT,
                payload: { name: name, data: true },
              });
            }
          }}
          onValueChange={({ value: v }) => {
            var isNegatif = +v < 0 || v.includes("-");
            var newValue = onlyPositif && isNegatif ? Math.abs(+v) : +v;

            if (dispatch) {
              dispatch({
                type: HousingFormActionKind.UPDATE_INPUT,
                payload: { name: name, data: newValue },
              });
            } else {
              handleChangeInput(newValue);
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
                    disabled={disabledDecreasButton}
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
                          type: HousingFormActionKind.UPDATE_MONEY_DECREASE,
                          payload: { name: name, step: 0.25 },
                        });
                        dispatch({
                          type: HousingFormActionKind.TOCUHED_INPUT,
                          payload: { name: name, data: true },
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
                          type: HousingFormActionKind.UPDATE_MONEY_INCREASE,
                          payload: { name: name, step: 0.25 },
                        });
                        dispatch({
                          type: HousingFormActionKind.TOCUHED_INPUT,
                          payload: { name: name, data: true },
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

export default PercentageField;
