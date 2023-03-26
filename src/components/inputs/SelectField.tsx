import { HousingFormActionKind } from "@/contexts/HousingFormContext";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import InputSection from "../layout/InputSection";

type SelectFieldProps = {
  name: string;
  label: string;
  value?: string;
  options: any[];
  dispatch?: any;
  step?: number;
};

const SelectField = ({
  name,
  label,
  value,
  options,
  dispatch,
}: SelectFieldProps) => {
  return (
    <InputSection>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          value={value}
          onChange={(e) =>
            dispatch({
              type: HousingFormActionKind.UPD_INPUT,
              payload: { name: name, data: e.target.value },
            })
          }
          label={label}
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
