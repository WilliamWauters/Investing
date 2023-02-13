import formatMoney from "@/utils/formatMoney";
import { Slider, Typography } from "@mui/material";
import { useState } from "react";

type MoneySliderProps = {
  label: string;
  min: number;
  step: number;
  max: number;
  defaultValue: number;
  value?: number;
  handleChange?: any;
};

const MoneySlider = ({
  label,
  min,
  step,
  max,
  defaultValue,
  value,
  handleChange,
}: MoneySliderProps) => {
  const [valueInput, setValueInput] = useState(250000);
  const handleChangeInput = (newPrice: number | number[]) => {
    if (typeof newPrice === "number") {
      setValueInput(newPrice);
    }
  };

  return (
    <>
      <Typography>
        {label} :{formatMoney(value || valueInput)}
      </Typography>
      <Slider
        sx={{
          mb: -1,
        }}
        size="small"
        value={value || valueInput}
        min={min}
        step={step}
        max={max}
        defaultValue={defaultValue}
        onChange={(e, val) =>
          handleChange ? handleChange(val) : handleChangeInput(val)
        }
      />
    </>
  );
};

export default MoneySlider;
