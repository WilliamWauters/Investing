import InputSection from "@/components/layout/InputSection";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";

const PersonalSituationForm = () => {
  return (
    <>
      {" "}
      <InputSection>
        <FormControl fullWidth>
          <Typography gutterBottom>Income</Typography>
          <Select size="small">
            <MenuItem value={"Brussels"}>Brussels</MenuItem>
            <MenuItem value={"Flanders"}>Flanders</MenuItem>
            <MenuItem value={"Wallonia"}>Wallonia</MenuItem>
          </Select>
        </FormControl>
      </InputSection>
      <InputSection>
        <FormControl fullWidth>
          <Typography gutterBottom>Fees</Typography>
          <Select size="small">
            <MenuItem value={"Brussels"}>Brussels</MenuItem>
            <MenuItem value={"Flanders"}>Flanders</MenuItem>
            <MenuItem value={"Wallonia"}>Wallonia</MenuItem>
          </Select>
        </FormControl>
      </InputSection>
    </>
  );
};

export default PersonalSituationForm;
