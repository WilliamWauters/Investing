import InputSection from "@/components/layout/InputSection";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";

const PersonalSituationForm = () => {
  return (
    <>
      {" "}
      <Box
        sx={{
          px: 2,
          py: 1,
          mx: 2,
          mt: 3,
          mb: 2,
          backgroundColor: "#1E293B",
          color: "#CBD5E1",
          borderRadius: "5px",
        }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{
            width: "100%",
            color: "#38BDF8",
            fontSize: "1rem",
          }}
        >
          Personal Situation
        </Typography>
      </Box>
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
