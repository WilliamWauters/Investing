import InputSection from "@/components/layout/InputSection";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  HousingFormActionKind,
  TaxationRegime,
  useHousingForm,
} from "@/contexts/HousingFormContext";
import FormPaneHeader from "@/components/content/FormPaneHeader";
import MoneyField from "@/components/inputs/MoneyField";
import HousingSituationResults from "./results/HouseSituationResults";

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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Taxation Regime</InputLabel>
          <Select
            value={HousingFormState.taxationRegime || ""}
            onChange={(e) =>
              dispatch({
                type: HousingFormActionKind.UPD_INPUT,
                payload: { name: "taxationRegime", data: e.target.value },
              })
            }
            size="small"
            label="taxationRegime"
          >
            <MenuItem value={TaxationRegime.BXL_WITH_ABATTEMENT_175}>
              With "Abattement" of 175.000 €
            </MenuItem>
            <MenuItem value={TaxationRegime.BXL_WITH_ABATTEMENT_200}>
              With "Abattement" of 200.000 €
            </MenuItem>
            <MenuItem value={TaxationRegime.BXL_WITHOUT_ABATTEMENT}>
              Without "Abbatment"
            </MenuItem>
          </Select>
        </FormControl>
      </InputSection>
      <HousingSituationResults />
    </>
  );
};

export default HouseSituationForm;
