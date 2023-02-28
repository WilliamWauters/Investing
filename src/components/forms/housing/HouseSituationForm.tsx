import InputSection from "@/components/layout/InputSection";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useHousingForm } from "@/contexts/HousingFormContext";
import FormPaneHeader from "@/components/content/FormPaneHeader";
import MoneyField from "./inputs/moneyField";

const HouseSituationForm = () => {
  const {
    HousingFormState,
    handleChangeLocation,
    handleChangeType,
    handleChangeIsOwnAndUnique,
    handleChangeIsEntiteldToReduction,
  } = useHousingForm();
  return (
    <>
      <FormPaneHeader title="House Situation" />
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
          <MoneyField />
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
