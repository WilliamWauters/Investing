import InputSection from "@/components/layout/InputSection";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useHousingForm } from "@/contexts/HousingFormContext";
import { NumericFormat } from "react-number-format";

const HouseSituationForm = () => {
  const {
    HousingFormState,
    handleChangeLocation,
    handleChangeType,
    handleChangePrice,
    handleChangePriceIncrementation,
    handleChangeIsOwnAndUnique,
    handleChangeIsEntiteldToReduction,
  } = useHousingForm();
  return (
    <>
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
          House Situation
        </Typography>
      </Box>
      <InputSection>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Location</InputLabel>
          <Select
            value={HousingFormState.location || ""}
            onChange={(e) => handleChangeLocation(e.target.value)}
            size="small"
            label="Location"
          >
            <MenuItem value={"Brussels"}>Brussels</MenuItem>
            <MenuItem value={"Flanders"}>Flanders</MenuItem>
            <MenuItem value={"Wallonia"}>Wallonia</MenuItem>
          </Select>
        </FormControl>
      </InputSection>
      <InputSection>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            value={HousingFormState.type || ""}
            onChange={(e) => handleChangeType(e.target.value)}
            size="small"
            label="Type"
          >
            <MenuItem value={"House"}>House</MenuItem>
            <MenuItem value={"Appartment"}>Appartment</MenuItem>
            <MenuItem value={"Domain"}>Domain</MenuItem>
          </Select>
        </FormControl>
      </InputSection>
      <InputSection>
        <FormControl fullWidth>
          <NumericFormat
            customInput={TextField}
            value={HousingFormState.price}
            label="Amount"
            variant="outlined"
            size="small"
            thousandSeparator={"."}
            decimalSeparator={","}
            prefix={" "}
            suffix={" €"}
            onValueChange={({ value: v }) => {
              handleChangePrice(+v);
            }}
            onKeyDown={(e) => {
              handleChangePriceIncrementation(e.key);
            }}
          />
        </FormControl>
      </InputSection>
      <InputSection>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={HousingFormState.isOwnAndUnique || false}
                onChange={(e) => handleChangeIsOwnAndUnique(e.target.checked)}
              />
            }
            label="This home is my own an unique home"
          />
        </FormGroup>
      </InputSection>
      <InputSection>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={HousingFormState.isEntiteldToReduction || false}
                onChange={(e) =>
                  handleChangeIsEntiteldToReduction(e.target.checked)
                }
              />
            }
            label="I have the right to get an abattement"
          />
        </FormGroup>
      </InputSection>
    </>
  );
};

export default HouseSituationForm;
