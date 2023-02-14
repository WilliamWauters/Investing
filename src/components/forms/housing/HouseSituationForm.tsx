import { useEffect, useState, useContext } from "react";
import InputSection from "@/components/layout/InputSection";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useHousingForm } from "@/contexts/HousingFormContext";

const HouseSituationForm = () => {
  const { location, handleChangeLocation } = useHousingForm();

  console.log(location);

  return (
    <>
      <InputSection>
        <FormControl fullWidth size="small">
          <Typography gutterBottom>Location</Typography>
          <Select
            value={location || ""}
            onChange={(e) => handleChangeLocation(e.target.value)}
          >
            <MenuItem value={"Brussels"}>Brussels</MenuItem>
            <MenuItem value={"Flanders"}>Flanders</MenuItem>
            <MenuItem value={"Wallonia"}>Wallonia</MenuItem>
          </Select>
        </FormControl>
      </InputSection>
      <InputSection>
        <FormControl fullWidth size="small">
          <Typography gutterBottom>Type</Typography>
          <Select>
            <MenuItem value={10}>House</MenuItem>
            <MenuItem value={20}>Appartment</MenuItem>
            <MenuItem value={30}>Domain</MenuItem>
          </Select>
        </FormControl>
      </InputSection>
      <InputSection>
        <FormControl fullWidth size="small">
          <Typography gutterBottom>Amount</Typography>
          <TextField size="small" id="outlined-basic" variant="outlined" />
        </FormControl>
      </InputSection>
      <InputSection>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="This home is my own an unique home"
          />
        </FormGroup>
      </InputSection>
      <InputSection>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="I have the right to get an Abattement"
          />
        </FormGroup>
      </InputSection>
    </>
  );
};

export default HouseSituationForm;
