import { Slider, Typography } from "@mui/material";
import { useState } from "react";
import { NumericFormat } from "react-number-format";

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
        {label} :{valueLabelFormat(value || valueInput)}
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

function valueLabelFormat(value: number) {
  return (
    <Typography component="span" sx={{ fontWeight: "bold", color: "#38BDF8" }}>
      <NumericFormat
        value={value}
        displayType={"text"}
        thousandSeparator={true}
        prefix={" "}
        suffix={" €"}
      />
    </Typography>
  );
}

export default MoneySlider;
