import { useHousingForm } from "@/contexts/HousingFormContext";
import FormPaneHeader from "@/components/content/FormPaneHeader";
import MoneyField from "@/components/inputs/MoneyField";
import SelectField from "@/components/inputs/SelectField";
import HousingSituationResults from "./HouseSituationResults";
import { taxationRegimes } from "@/utils/enums/TaxationRegime";
import { locations } from "@/utils/enums/Location";
import { houseTypes } from "@/utils/enums/HouseType";
import { Fade, Grow } from "@mui/material";

const HouseSituationForm = () => {
  const {
    housingFormState,
    housingFormValidationState,
    housingFormErrorState,
    dispatch,
  } = useHousingForm();

  return (
    <>
      <Fade in={true} timeout={500}>
        <div>
          <FormPaneHeader title="House Situation" />
          <SelectField
            name="houseLocation"
            label="Location"
            required
            value={housingFormState.houseLocation.value || ""}
            touched={housingFormState.houseLocation.touched}
            errorMsg={housingFormErrorState.houseLocation}
            dispatch={dispatch}
            options={locations}
          />
          <SelectField
            name="houseType"
            label="Type"
            required
            value={housingFormState.houseType.value || ""}
            touched={housingFormState.houseType.touched}
            errorMsg={housingFormErrorState.houseType}
            dispatch={dispatch}
            options={houseTypes}
          />
          <MoneyField
            label="Price"
            name="housePrice"
            required
            value={housingFormState.housePrice.value || ""}
            touched={housingFormState.housePrice.touched}
            errorMsg={housingFormErrorState.housePrice}
            dispatch={dispatch}
          />
          <SelectField
            name="taxationRegime"
            label="Taxation Regime"
            required
            value={housingFormState.taxationRegime.value || ""}
            touched={housingFormState.taxationRegime.touched}
            errorMsg={housingFormErrorState.taxationRegime}
            dispatch={dispatch}
            options={taxationRegimes}
          />
        </div>
      </Fade>
      {housingFormValidationState.houseSituation && <HousingSituationResults />}
    </>
  );
};

export default HouseSituationForm;
