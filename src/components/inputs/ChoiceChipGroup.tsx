import { Chip, Stack, Typography } from "@mui/material";
import { useState } from "react";

type ChoiceChipGroupProps = {
  label: string;
  options: string[];
  value?: string;
  handleChange?: any;
};

const ChoiceChipGroup = ({
  label,
  options,
  value,
  handleChange,
}: ChoiceChipGroupProps) => {
  const [valueInput, setValueInput] = useState("");
  const handleChangeInput = (newLocation: string) => {
    setValueInput(newLocation);
  };

  const chipsWidth = `${100 / options.length}%`;

  return (
    <>
      <Typography gutterBottom>{label}</Typography>
      <Stack direction="row" spacing={1} justifyContent="center">
        {options.map((loca) => {
          return (
            <Chip
              key={loca}
              color={
                loca === value || loca === valueInput ? "primary" : undefined
              }
              label={loca}
              variant="outlined"
              onClick={() =>
                handleChange ? handleChange(loca) : handleChangeInput(loca)
              }
              sx={{ width: chipsWidth }}
            />
          );
        })}
      </Stack>
    </>
  );
};

export default ChoiceChipGroup;
