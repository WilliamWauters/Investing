import { HousingFormActionKind } from "@/contexts/HousingFormContext";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import InputSection from "../layout/InputSection";

type SelectFieldProps = {
  name: string;
  label: string;
  value?: string;
  options: any[];
  touched?: boolean;
  required?: boolean;
  dispatch?: any;
};

const SelectField = ({
  name,
  label,
  value,
  options,
  touched,
  required,
  dispatch,
}: SelectFieldProps) => {
  var error = false;
  if (touched && required && value === "") {
    error = true;
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
              type: HousingFormActionKind.UPD_INPUT,
              payload: { name: name, data: e.target.value },
            })
          }
          onClose={(e) => {
            dispatch({
              type: HousingFormActionKind.TOUCHED,
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
      </FormControl>
    </InputSection>
  );
};

export default SelectField;
