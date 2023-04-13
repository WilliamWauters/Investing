import { HousingFormActionKind } from "@/contexts/HousingFormContext";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import InputSection from "../layout/InputSection";

type SelectFieldProps = {
  name: string;
  label: string;
  value?: string;
  options: any[];
  touched?: boolean;
  errorMsg?: string;
  required?: boolean;
  dispatch?: any;
};

const SelectField = ({
  name,
  label,
  value,
  options,
  touched,
  errorMsg,
  required,
  dispatch,
}: SelectFieldProps) => {
  var error = false;
  if (touched && errorMsg !== "") {
    error = true;
  }
  if (name === "houseLocation") {
    console.log(name, error);
    console.log("touched", touched);
    console.log("errorMsg", errorMsg);
    console.log("-----------------------");
  }

  return (
    <InputSection>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" error={error}>
          {label}
        </InputLabel>
        <Select
          value={value}
          onChange={(e) =>
            dispatch({
              type: HousingFormActionKind.UPDATE_INPUT,
              payload: { name: name, data: e.target.value },
            })
          }
          onClose={(e) => {
            dispatch({
              type: HousingFormActionKind.TOCUHED_INPUT,
              payload: { name: name, data: true },
            });
          }}
          label={label}
          error={error}
        >
          {options.map((x) => (
            <MenuItem key={`${name}${x.value}`} value={x.value}>
              {x.label}
            </MenuItem>
          ))}
        </Select>
        {touched && errorMsg && (
          <FormHelperText error={error}>{errorMsg}</FormHelperText>
        )}
      </FormControl>
    </InputSection>
  );
};

export default SelectField;
