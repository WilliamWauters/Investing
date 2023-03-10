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
import {
  HousingFormActionKind,
  useHousingForm,
} from "@/contexts/HousingFormContext";
import FormPaneHeader from "@/components/content/FormPaneHeader";
import MoneyField from "@/components/inputs/MoneyField";

const HouseSituationForm = () => {
  const { HousingFormState, dispatch } = useHousingForm();
  return (
    <>
      <FormPaneHeader title="House Situation" />
      <InputSection>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Location</InputLabel>
          <Select
            value={HousingFormState.location || ""}
            onChange={(e) =>
              dispatch({
                type: HousingFormActionKind.UPD_INPUT,
                payload: { name: "location", data: e.target.value },
              })
            }
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
            onChange={(e) =>
              dispatch({
                type: HousingFormActionKind.UPD_INPUT,
                payload: { name: "Type", data: e.target.value },
              })
            }
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
          <MoneyField
            label="Price"
            name="housePrice"
            value={HousingFormState.housePrice}
            dispatch={dispatch}
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
                onChange={(e) =>
                  dispatch({
                    type: HousingFormActionKind.UPD_INPUT,
                    payload: { name: "isOwnAndUnique", data: e.target.checked },
                  })
                }
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
                  dispatch({
                    type: HousingFormActionKind.UPD_INPUT,
                    payload: {
                      name: "isEntiteldToReduction",
                      data: e.target.checked,
                    },
                  })
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
